import Acronym from "./acronym";

type IndexEntryProps = {
  letter: string;
  acronyms: any;
};

const IndexEntry = ([letter, acronyms]: any) => {
  return (
    <div key={letter} className="mb-6">
      <h2 className="sticky m-0 text-pink-600 text-9xl">
        {letter.toLocaleUpperCase()}
      </h2>
      <div>
      {acronyms.length > 0 && <ul>{acronyms.sort((a:any, b: any) => a.term.localeCompare(b.term)).map(Acronym)}</ul>}
      </div>
    </div>
  );
};

export default IndexEntry;
