import Acronym from "./Acronym";

type IndexEntryProps = {
  letter: string;
  acronyms: any;
};

const IndexEntry = ([letter, acronyms]: any) => {
  return (
    <div key={letter} className="mb-6">
      <h2 className="text-pink-600 text-9xl m-0 sticky">
        {letter.toLocaleUpperCase()}
      </h2>
      {acronyms.length > 0 && <ul>{acronyms.map(Acronym)}</ul>}
    </div>
  );
};

export default IndexEntry;
