
export default {
  name: "term",
  type: "document",
  fields: [
    {
      name: "term",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "term",
      },
    },
    {
      name: "definitions",
      type: "array",
      of: [{ type: "definition" }],
    }
  ],
  preview: {
    select: {
      title: "term",
      subtitle: "definitions.length",
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `${subtitle} definition${subtitle === 1 ? "" : "s"}`,
      }
    }
  }
}
