import Head from "next/head";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "../../utils/sanity";
function Letter(props) {
  const { letter = "", acronyms = [] } = props;
  return (
    <>
      <Head>
        <title> {letter} - Acronym.dev </title>
      </Head>
      <article className="flex flex-col items-left min-h-screen p-4">
        <h1 className="font-bold">{letter}</h1>
        {acronyms.length > 0 && (
          <ul>
            {acronyms.map((acronym) => {
              return (
                <li key={acronym._id}>
                  <Link href={`/${acronym?.slug?.current}`}>
                    <a>{acronym.term}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </article>
      <aside>Other relevant terms</aside>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: ["/letter/A"],
    fallback: true,
  };
};
const query = groq`*[$letter in explainer[].letter]`;

export const getStaticProps = async ({ params }) => {
  const { letter } = params;
  const acronyms = await client.fetch(query, { letter });
  return {
    props: {
      letter,
      acronyms,
    },
  };
};

export default Letter;
