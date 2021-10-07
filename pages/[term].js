import Head from "next/head";
import Link from "next/link";
import { groq } from "next-sanity";
import { client, BlockContent } from "../utils/sanity";
import React from "react";
function Acronym({ doc = {} }) {
  const { term = "", description = [], explainer = [] } = doc;
  return (
    <>
      <Head>
        <title> {term} - Acronym.dev </title>
      </Head>
      <p>
        <Link href="/">
          <a>&larr; Home</a>
        </Link>{" "}
      </p>
      <article className="flex flex-col items-left min-h-screen p-4">
        <h1 className="font-bold">{term}</h1>
        <div>
          <dl>
            {explainer.length > 0 &&
              explainer.map((token) => {
                return (
                  <>
                    <dt key={token?._key + token?.letter}>
                      <Link href={`/letter/${token?.letter}`}>
                        <a>{token?.letter}</a>
                      </Link>
                    </dt>
                    <dd key={token?._key + token?.term}>{token?.term}</dd>
                  </>
                );
              })}
          </dl>
        </div>
        {description?.length > 0 && <BlockContent blocks={description} />}
        <p className="py-10">Suggest an acronym</p>
      </article>
      <aside>Other relevant terms</aside>
    </>
  );
}

const query = groq`*[_type == "term" && slug.current == $term][0]{
  _id,
  term,
  description,
  explainer,
  slug,
  _updatedAt
}`;

export const getStaticPaths = () => {
  return {
    paths: ["/API"],
    fallback: true,
  };
};

export const getStaticProps = async (props) => {
  const { term } = props.params;
  const doc = await client.fetch(query, {
    term: term.toLowerCase(),
  });
  return {
    props: {
      doc,
    },
  };
};

export default Acronym;
