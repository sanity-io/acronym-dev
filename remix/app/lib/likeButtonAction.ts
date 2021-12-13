import { writeClient } from "~/lib/sanity/writeClient";

export async function likeButtonAction(data: any) {
  const _key = data.get("_key");
  const id = data.get("id");
  // sconst revisionId = data.get("revisionId");
  // sconst term = data.get("term");

  try {
    const patch = writeClient
      .patch(id)
      //.ifRevisionId(revisionId)
      .setIfMissing({ [`definitions[_key == \"${_key}\"].likes`]: 0 })
      .inc({ [`definitions[_key == \"${_key}\"].likes`]: 1 })
      .commit();
  } catch (e) {
    console.error(e);
  }

  return null;
}
