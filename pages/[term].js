import Head from "next/head";
import Link from "next/link";
import { groq } from "next-sanity";
import { client, BlockContent } from "../utils/sanity";
import Definition from "../components/Definition";

function Acronym({ doc = {} }) {
  const { term = "", definitions } = doc;
  return (
    <>
      <Head>
        <title> {term} - Acronym.dev </title>
      </Head>
      <p>
        <Link href="/">
          <a>&larr; Home</a>
        </Link>
      </p>
      <section className="p-6 border-1 bg-white border-gray-300 drop-shadow-md max-w-3xl mx-auto prose my-2">
        <h1 className="font-bold text-xxl">{term}</h1>
        {definitions && definitions.map((definition, index, arr) => (
          <Definition
            definition={definition}
            hr={index < arr.length - 1}
            key={definition?._key}
          />
        ))}
      </section>
      <section className="p-4">
        <p className="py-10">Suggest an acronym</p>
        <aside>Other relevant terms</aside>
      </section>
    </>
  );
}

const query = groq`*[_type == "term" && slug.current == $term][0]{
        _id,
        term,
        description,
        definitions,
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
