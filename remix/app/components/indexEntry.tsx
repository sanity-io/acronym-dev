import { Link } from "remix";
import Acronym from "./acronym";

type IndexEntryProps = {
  letter: string;
  acronyms: any;
};

const IndexEntry = ([letter, acronyms]: any) => {
  return (
    <div key={letter} className="mb-6">
      <h2 id={letter} className="pt-6">
        <a
          href={`#${letter}`}
          className="m-0 text-pink-600 text-9xl no-underline"
        >
          {letter.toLocaleUpperCase()}
        </a>
      </h2>
      <div>
        {acronyms.length > 0 && (
          <ul>
            {acronyms
              .sort((a: any, b: any) => a.term.localeCompare(b.term))
              .map(Acronym)}
          </ul>
        )}
      </div>
      {/* <Link to="/">top</Link> */}
    </div>
  );
};

export default IndexEntry;
