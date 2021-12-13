import Head from "next/head";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "../utils/sanity";
import IndexEntry from "../components/IndexEntry";
const acronymIndex = acronyms => {
  const indexSet = new Set(
    acronyms.map(acronym => acronym.term.toLowerCase()[0])
  );
  return Array.from(indexSet).reduce((acc, letter) => ({
    ...acc,
    [letter]: acronyms.filter(acronym => acronym.term.toLowerCase()[0] === letter)
  }), []);
}

function Letter(props) {
  const { acronyms = [] } = props;
  const index = acronymIndex(acronyms);
  const indexEntries = Object.entries(index)
  return (
    <>
      <Head>
        <title>Acronym.dev</title>
      </Head>
      <article className="flex flex-col items-left min-h-screen p-4 prose">
        <h1 className="font-bold">Acronym.dev</h1>
        {
          indexEntries.map(IndexEntry)
        }
      </article>
      <aside>Other relevant terms</aside>
    </>
  );
}

const query = groq`*[_type == "term"]|order(term)`;

export const getStaticProps = async () => {
  const acronyms = await client.fetch(query);
  return {
    props: {
      acronyms,
    },
  };
};

export default Letter;
