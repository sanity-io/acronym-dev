import Head from "next/head";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "../../utils/sanity";
import Acronym from "../../components/Acronym";

function Letter(props) {
  const { letter = "", acronyms = [] } = props;
  return (
    <>
      <Head>
        <title> {letter} - Acronym.dev </title>
      </Head>
      <article className="flex flex-col items-left min-h-screen p-4">
        <div className="text-decoration-none mb-4">
          <Link href="/">🔙 Back</Link>
        </div>
        <div className="prose">
          <h1 className="font-bold">{letter}</h1>
          {acronyms.length > 0 && (
            <ul>
              {acronyms.map(Acronym)}
            </ul>
          )}
        </div>
      </article>
      <aside>Other relevant terms</aside>
      <pre>
        {JSON.stringify(props?.related, null, 2)}
      </pre>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: ["/letter/A"],
    fallback: true,
  };
};
const query = groq`{
  "acronyms": *[$letter in definitions[].explainer[0].letter]|order(term asc),
  "related": *[$letter in definitions[].explainer[].letter && !($letter in definitions[].explainer[0].letter)]
}`


export const getStaticProps = async ({ params }) => {
  const { letter } = params;
  const { acronyms, related } = await client.fetch(query, { letter });
  return {
    props: {
      letter,
      acronyms,
      related
    },
  };
};

export default Letter;
