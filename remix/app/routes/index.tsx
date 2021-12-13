import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import groq from "groq";
import { client } from "~/lib/sanity/client";
import IndexEntry from "~/components/indexEntry";
const query = groq`*[_type == "term" && exclude != true]|order(term)`;

type IndexData = {
  acronyms: Array<{ name: string; url: string }>;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Acronym.dev",
    description:
      "A curated list of acronyms, initialisms and abbreviations from the tech world",
  };
};

export async function loader() {
  const acronyms = await client.fetch(query);
  return { acronyms };
}

const acronymIndex = (acronyms: any) => {
  const indexSet = new Set(
    acronyms.map((acronym: any) => acronym.term.toLowerCase()[0])
  );
  return Array.from(indexSet).reduce(
    (acc, letter) => ({
      ...acc,
      [letter]: acronyms.filter(
        (acronym) => acronym.term.toLowerCase()[0] === letter
      ),
    }),
    []
  );
};

export default function Letter() {
  let data = useLoaderData<IndexData>();
  const { acronyms = [] } = data;
  const index = acronymIndex(acronyms);
  const indexEntries = Object.entries(index);
  return (
    <main className="flex flex-col min-h-screen p-4  items-left">
      <nav className="flex justify-evenly mx-auto w-full sticky top-0 bg-white">
        {indexEntries.map(([letter]) => (
          <Link
            to={`#${letter}`}
            className="font-medium text-xl uppercase hover:text-pink-600"
          >
            {letter}
          </Link>
        ))}
      </nav>
      <div className="prose">{indexEntries.map(IndexEntry)}</div>
    </main>
  );
}
