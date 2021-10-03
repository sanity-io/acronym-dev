import { groq } from "next-sanity";
import { client } from "../utils/sanity";
function Acronym(props) {
  const { term } = props;
  return (
    <>
      <article className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{term}</h1>
        <p>Description</p>
        <p>Suggest an acronym</p>
      </article>
      <aside>Other relevant terms</aside>
    </>
  );
}

const query = groq`*[_type == "term" && slug.current == $term][0]{
  _id,
  term,
  description
}`;

export const getStaticPaths = () => {
  return {
    paths: ["/API"],
    fallback: true,
  };
};

export const getStaticProps = async (props) => {
  const { term } = props.params;
  const termDescription = await client.fetch(query, { term });
  return {
    props: {
      term,
      termDescription,
    },
  };
};

export default Acronym;
