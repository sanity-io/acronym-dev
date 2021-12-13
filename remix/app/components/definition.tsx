import React from "react";
import { Link } from "remix";
import { PortableText } from "~/lib/sanity/PortableText";

type DefinitionProps = {
  definition: any;
  hr: boolean;
};

const Definition = ({ definition, hr }: DefinitionProps) => {
  return (
    <React.Fragment>
      <article className="flex flex-col py-0 items-left">
        <dl className="flex text-xl">
          {definition.explainer.length > 0 &&
            definition.explainer.map((token) => {
              console.log("token: ", token);
              return (
                <section
                  className="flex mb-1 mr-1"
                  key={token?._key + token?.letter}
                >
                  <dt>
                    <Link
                      to={`/letter/${token?.letter}`}
                      className="font-bold text-blue-600/100 hover:decoration-blue-600"
                    >
                      {token?.letter}
                    </Link>
                  </dt>
                  <dd className="text-gray-600" key={token?._key + token?.term}>
                    <span style={{ display: "none" }}>
                      {token?.term.slice(0, 1)}
                    </span>
                    {token?.term.slice(1)}
                  </dd>
                </section>
              );
            })}
        </dl>
        {definition.description?.length > 0 && (
          <div className="text-sm">
            <PortableText blocks={definition.description} />
          </div>
        )}
        {definition.resources?.length > 0 && (
          <>
            <h4 className="mb-0 font-normal text-slate-600">Resources</h4>
            <ul className="p-4 pt-0 mt-2 list-disc">
              {definition.resources.map((resource) => (
                <li key={resource._key}>
                  <Link
                    to={resource.url}
                    className="text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
      {hr && <hr className="mt-4 mb-5" />}
    </React.Fragment>
  );
};

export default Definition;
