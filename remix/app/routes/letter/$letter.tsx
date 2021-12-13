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
  "words":
`;

export const loader: LoaderFunction = async ({ params }) => {
  const { letter } = params;
  const { acronyms, related } = await client.fetch(query, { letter });
  return {
    letter,
    acronyms,
    related,
  };
};

function Letter() {
  const { letter, acronyms, related } = useLoaderData();

  return (
    <React.Fragment>
      <article className="flex flex-col items-left min-h-screen p-4">
        <div className="text-decoration-none mb-4">
          <Link to="/">🔙 Back</Link>
        </div>
        <div className="prose">
          <h1 className="font-bold">{letter}</h1>
          {acronyms.length > 0 && <ul>{acronyms.map(Acronym)}</ul>}
        </div>
      </article>
      <aside>Other relevant terms</aside>
      <pre>{JSON.stringify(related, null, 2)}</pre>
    </React.Fragment>
  );
}

export default Letter;
