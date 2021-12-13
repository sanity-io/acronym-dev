import { client } from "~/lib/sanity/client";

export async function loader({ request }: { request: any }) {
  if (request.method !== "GET") {
    return new Response(`{"status":"Method not allowed"}`, {
      status: 405,
      headers: {
        "content-type": "application/json",
      },
    });
  }
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  const data = await client
    .config({ useCdn: true })
    .fetch(query)
    .then((doc) => JSON.stringify(doc));
  return new Response(data, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
