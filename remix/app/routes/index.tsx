import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import groq from "groq";
import { client } from "~/lib/sanity/client";
import IndexEntry from "~/components/IndexEntry";
const query = groq`*[_type == "term" && exclude != true]|order(term)`;

type IndexData = {
  acronyms: Array<{ name: string; url: string }>;
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
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
    <>
      <main className="flex flex-col items-left min-h-screen p-4 prose">
        {indexEntries.map(IndexEntry)}
      </main>
      <aside>Other relevant terms</aside>
    </>
  );
}
