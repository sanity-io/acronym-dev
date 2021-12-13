import { writeClient } from "~/lib/sanity/writeClient";

export async function likeButtonAction(data: any) {
  const _key = data.get("_key");
  const id = data.get("id");
  const revisionId = data.get("revisionId");
  const term = data.get("term");
  const sanityPatch = {
    id,
    inc: {
      'defintions[_key == "$_key"]': 1,
    },
    //⬇ Maybe we want this to avoid race conditions?
    //ifRevisionId: revisionId,
  };
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
