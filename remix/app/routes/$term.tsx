import { useLoaderData } from "remix";
import groq from "groq";
import { client } from "~/lib/sanity/client";
import Definition from "../components/definition";
import TermHeader from "~/components/termHeader";
import { likeButtonAction } from "~/lib/likeButtonAction";

export async function action({ request }: { request: any }) {
  const data = await request.formData();
  return likeButtonAction(data);
}

type DefinitionProps = {
  _key: string;
  definition: any;
  index: number;
  arr: any[];
  slug: { current: string };
  likes: number;
};

interface AcronymDoc {
  _id: string;
  _rev: string;
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
        definitions[]{
          ...,
          suggestedBy->
        },
        slug,
        _rev,
        _updatedAt
      }`;

export async function loader({ params }: { params: { term: string } }) {
  const { term } = params;
  const doc = await client.fetch(query, {
    term: term.toLowerCase(),
  });
  return {
    doc,
    term,
  };
}

export default function Acronym({ children }: { children: React.ReactNode }) {
  const { doc }: AcronymProps = useLoaderData();
  const { term = "", definitions, _rev, _id } = doc;
  return (
    <>
      <section className="p-6 border-1 bg-white border-gray-300 drop-shadow-md max-w-3xl mx-auto prose my-2 rounded">
        <TermHeader term={term} />
        {definitions &&
          definitions
            .sort((a, b) => a.slug?.current.localeCompare(b.slug?.current))
            .sort((a, b) => b.likes - a.likes)
            .map((definition, index, arr) => (
              <Definition
                revisionId={_rev}
                _key={definition?._key}
                id={_id}
                definition={definition}
                hr={index < arr.length - 1}
                term={term}
              />
            ))}
      </section>
    </>
  );
}
