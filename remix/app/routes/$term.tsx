import { Link, MetaFunction, useLoaderData } from "remix";
import groq from "groq";
import { client } from "~/lib/sanity/client";
import Definition from "../components/Definition";

type DefinitionProps = {
  definition: any;
  index: number;
  arr: any[];
  _key: string;
};

interface AcronymDoc {
  term?: string;
  definitions?: [DefinitionProps];
}

interface AcronymProps {
  doc: AcronymDoc;
}

const query = groq`*[_type == "term" && slug.current == $term][0]{
        _id,
        term,
        description,
        definitions,
        slug,
        _updatedAt
      }`;

export async function loader({ params }: { params: { term: string } }) {
  const { term } = params;
  const doc = await client.fetch(query, {
    term: term.toLowerCase(),
  });
  return {
    doc,
  };
}

export default function Acronym() {
  const { doc }: AcronymProps = useLoaderData();
  const { term = "", definitions } = doc;
  return (
    <>
      <section className="p-6 border-1 bg-white border-gray-300 drop-shadow-md max-w-3xl mx-auto prose my-2">
        <h1 className="font-bold text-xxl">{term}</h1>
        {definitions &&
          definitions.map((definition, index, arr) => (
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
