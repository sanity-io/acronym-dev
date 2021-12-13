import groq from "groq";
import { useLoaderData, Link } from "remix";
import Definition from "~/components/Definition";
import { client } from "~/lib/sanity/client";
import { likeButtonAction } from "~/lib/likeButtonAction";

const query = groq`*[_type == "term" && slug.current == $term][0]{
        _id,
        term,
        description,
        definitions[slug.current == $definitionSlug && _key == $definitionKey],
        slug,
        _rev,
        _updatedAt
      }`;
type loaderProps = {
  term: string;
  definition?: string;
  slug?: string;
};

export async function action({ request }) {
  const data = await request.formData();
  return likeButtonAction(data);
}

export async function loader({ params }: { params: loaderProps }) {
  const { term, slug, definition } = params;
  const doc = await client.fetch(query, {
    term: term.toLowerCase(),
    definitionSlug: slug,
    definitionKey: definition,
  });
  return {
    doc,
    term,
    slug,
  };
}

export default function TermDefinition() {
  const { doc, term, slug } = useLoaderData();
  const { definitions, term: termName, _rev } = doc;
  return (
    <div>
      <>
        <Link to={`/${term}/${slug}`}>Back</Link>
        <section className="p-6 border-1 bg-white border-gray-300 drop-shadow-md max-w-3xl mx-auto prose my-2">
          <h1 className="font-bold text-xxl bg-slate-500 text-white inline-block p-1 px-3 italic">
            {term.toUpperCase()}
          </h1>
          {definitions &&
            definitions.map((definition: any, index: number, arr: any[]) => (
              <Definition
                definition={definition}
                hr={index < arr.length - 1}
                key={definition?._key}
                term={term}
                revisionId={_rev}
              />
            ))}
        </section>
        <section className="p-4">
          <p className="py-10">Suggest an acronym</p>
          <aside>Other relevant terms</aside>
        </section>
      </>
    </div>
  );
}
