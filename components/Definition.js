import React from "react";
import Link from "next/link";
import { client, BlockContent } from "../utils/sanity";

const Definition = ({ definition, hr }) => {
  return (
    <React.Fragment>
      <article
        className="flex flex-col py-0 items-left"
      >
        <dl className="flex text-xl">
          {definition.explainer.length > 0 &&
            definition.explainer.map((token) => {
              return (
                <section className="flex mb-1 mr-1" key={token?._key + token?.letter}>
                  <dt>
                    <Link href={`/letter/${token?.letter}`}>
                      <a className="font-bold text-blue-600/100 hover:decoration-blue-600">{token?.letter}</a>
                    </Link>
                  </dt>
                  <dd className="text-gray-600" key={token?._key + token?.term}><span style={{ display: 'none' }}>{token?.term.slice(0, 1)}</span>{token?.term.slice(1)}</dd>
                </section>
              );
            })}
        </dl>
        {definition.description?.length > 0 && <div className="text-sm"><BlockContent blocks={definition.description} /></div>}
        {definition.resources?.length > 0 &&
          <>
            <h4 className="mb-0 font-normal text-slate-600">Resources</h4>
            <ul className="p-4 pt-0 mt-2 list-disc">
              {definition.resources.map((resource) => (
                <li key={resource._key}>
                  <Link href={resource.url}>
                    <a className="text-blue-600 hover:underline">{resource.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        }
      </article>
      {hr && <hr className="mt-4 mb-5" />}
    </React.Fragment>
  )
}

export default Definition;