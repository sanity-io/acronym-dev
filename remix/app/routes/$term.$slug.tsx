import groq from "groq";
import { useLoaderData, Link } from "remix";
import Definition from "~/components/definition";
import { client } from "~/lib/sanity/client";
import { likeButtonAction } from "~/lib/likeButtonAction";

export async function action({ request }) {
  const data = await request.formData();
  return likeButtonAction(data);
}
const query = groq`*[_type == "term" && slug.current == $term][0]{
        _id,
        _rev,
        _updatedAt,
        slug,
        term,
        description,
        definitions[slug.current == $definitionSlug],
      }`;
type loaderProps = {
  term: string;
  slug: string;
};

export async function loader({ params }: { params: loaderProps }) {
  const { term, slug } = params;
  const doc = await client.fetch(query, {
    term: term.toLowerCase(),
    definitionSlug: slug,
  });
  return {
    doc,
    term,
  };
}

export default function TermDefinition() {
  const { doc, term } = useLoaderData();
  const { definitions, slug, term: termName, _id, _rev } = doc;
  return (
    <div>
      <>
        <Link to={`/${term}`}>Back</Link>
        <section className="p-6 border-1 bg-white border-gray-300 drop-shadow-md max-w-3xl mx-auto prose my-2">
          <h1 className="font-bold text-xxl bg-slate-500 text-white inline-block p-1 px-3 italic">
            {term}
          </h1>
          {definitions &&
            definitions.map((definition, index, arr) => (
              <Definition
                definition={definition}
                hr={index < arr.length - 1}
                key={definition?._key}
                term={term}
                revisionId={_rev}
                id={_id}
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
