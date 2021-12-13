import { Link, LoaderFunction, useLoaderData } from "remix";
import groq from "groq";
import { client } from "~/lib/sanity/client";
import Acronym from "~/components/acronym";
import React from "react";

const query = groq`{
  "acronyms": *[$letter in definitions[].explainer[0].letter]|order(term asc),
  "related": *[$letter in definitions[].explainer[].letter && !($letter in definitions[].explainer[0].letter)]
}`;

const wordsQuery = groq`
  *[definitions[].explainer[].term match $letter+"*"].definitions[].explainer[term match $letter+"*"]{
  term,
  "count": count(*[^.term in definitions[].explainer[].term])
}
`;

export const loader: LoaderFunction = async ({ params }) => {
  const { letter } = params;
  console.log("letter: ", letter);
  // const { acronyms, related } = await client.fetch(query, { letter });
  const words = await client.fetch(wordsQuery, { letter });
  return {
    letter,
    words,
  };
};

const arrayUniqueByKey = (array, key) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];

function Letter() {
  const { letter, words } = useLoaderData();
  const dedupedWords = arrayUniqueByKey(words, "term");

  return (
    <React.Fragment>
      <article className="flex flex-col items-left min-h-screen p-4">
        <div className="text-decoration-none mb-4">
          <Link to="/">🔙 Back</Link>
        </div>
        <div className="prose">
          {dedupedWords
            .sort((a, b) => a.term.localeCompare(b.term))
            .sort((a, b) => b.count - a.count)
            .map((word) => (
              <div key={word.term} className="mb-4">
                {word.term} : {word.count}
              </div>
            ))}
        </div>
      </article>
      {/* <div className="prose">
          <h1 className="font-bold">{letter}</h1>
          {acronyms.length > 0 && <ul>{acronyms.map(Acronym)}</ul>}
        </div>
      </article>
      <aside>Other relevant terms</aside>
      <pre>{JSON.stringify(related, null, 2)}</pre> */}
    </React.Fragment>
  );
}

export default Letter;
