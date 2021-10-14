import React from "react";
import { Text, Badge } from "@sanity/ui";

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
      name: "explainer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "letter",
              type: "string",
            },
            {
              name: "term",
              type: "string",
            },
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
                    <Text size={4} weight="semibold" style={{ color: "white" }}>
                      {letter}
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
      name: "description",
      type: "portableText",
    },
  ],
};
