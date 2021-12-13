import React from "react";
import { Link } from "remix";
import { PortableText } from "~/lib/sanity/PortableText";
import LikeButton from "./likeButton";

type DefinitionProps = {
  term: string;
  definition: any;
  hr: boolean;
  _key: string;
  id: string;
  revisionId: string;
};

const Definition = ({
  term,
  definition,
  hr,
  revisionId,
  id,
}: DefinitionProps) => {
  return (
    <React.Fragment>
      <article className="flex flex-col py-0 items-left">
        <dl className="text-xl">
          <dt className="flex flex-wrap">
            {definition.explainer.length > 0 &&
              definition.explainer.map(
                (token: any, index: number, arr: any[]) => {
                  // ⬇ Takes care of compound words such as HyperText and JavaScript
                  const singleWord =
                    token.termRef &&
                    arr[index + 1]?.termRef &&
                    token.termRef._ref === arr[index + 1].termRef?._ref;

                  return (
                    <span
                      key={token?._key + token?.letter}
                      className={`mb-1 text-4xl text-slate-700 font-semibold ${
                        !singleWord && "mr-3"
                      }`}
                    >
                      {/* ⬇ If the word isn't represented with a letter in the abbr, skip linkage  */}
                      {token.letter ? (
                        <React.Fragment key={token?._key + token?.letter}>
                          <Link
                            to={`/letter/${token?.letter.slice(0, 1)}`}
                            className="font-bold text-pink-600/100 no-underline hover:underline"
                          >
                            {token?.letter}
                          </Link>
                          {token?.term.slice(token?.letter.length)}
                        </React.Fragment>
                      ) : (
                        <span>{token.term}</span>
                      )}
                    </span>
                  );
                }
              )}
          </dt>
          <dd>
            {definition.description?.length > 0 && (
              <div className="text-sm">
                <PortableText blocks={definition.description} />
                <Link
                  to={`/${term.toLowerCase()}/${definition?.slug?.current}/${
                    definition._key
                  }`}
                  className="mr-4"
                >
                  Permalink
                </Link>
                <LikeButton
                  id={id}
                  _key={definition._key}
                  term={term}
                  revisionId={revisionId}
                  likes={definition.likes}
                />
              </div>
            )}
            {definition.resources?.length > 0 && (
              <>
                <h4 className="mb-0 font-normal text-slate-600">Resources</h4>
                <ul className="p-4 pt-0 mt-2 list-disc">
                  {definition.resources.map((resource: any) => (
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
          </dd>
        </dl>
      </article>
      {hr && <hr className="mt-4 mb-5" />}
    </React.Fragment>
  );
};

export default Definition;
