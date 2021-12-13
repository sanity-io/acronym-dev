import React from "react";
import { Text, Badge } from "@sanity/ui";

export default {
  name: 'definition',
  title: 'Definition',
  type: 'object',
  fields: [
    {
      name: "explainer",
      type: "array",
      of: [
        {
          type: "object",
          // initialValues: {
          // Set initial value of letter from index in term string
          // },
          fieldsets: [
            { name: 'twoCols', options: { columns: 2 } }
          ],
          fields: [
            {
              name: "term",
              type: "string",
              fieldset: 'twoCols',
            },
            {
              name: "letter",
              type: "string",
              fieldset: 'twoCols',
            },
            {
              name: 'termRef',
              type: 'reference',
              to: [{ type: 'term' }],
            }
          ],
          preview: {
            select: {
              letter: "letter",
              term: "term",
            },
            prepare(selection) {
              const { letter, term } = selection;
              return {
                title: `${term}`,
                media: () => (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#ced2d9",
                    }}
                  >
                    <Text size={4} weight="semibold" style={{ color: letter ? "white" : "#333" }}>
                      {letter || '✘'}
                    </Text>
                  </div>
                ),
              };
            },
          },
        },
      ],
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: (doc, options) => options.parent.explainer,
        maxLength: 96,
        slugify: input => {
          const inputString = input.map(({ term }) => term).join("-");
          return inputString
            .toLowerCase()
            .replace(/[^\w-]+/g, "");
        }
      },
    },
    {
      name: "description",
      type: "portableText",
    },
    {
      name: "resources",
      type: "array",
      of: [
        {
          type: "resource",
        }
      ]
    },
    {
      name: "suggestedBy",
      type: "reference",
      to: [{ type: "person" }],
    },
    {
      name: 'likes',
      type: 'number',
      readOnly: true,
    },
    {
      name: 'enabled',
      type: 'boolean',
      description: 'Is this definition enabled?',
      initialValue: true,
    }
  ],
  preview: {
    select: {
      title: "description",
      subtitle: 'suggestedBy.name',
    },
  }
}