import Acronym from "./Acronym";

type IndexEntryProps = {
  letter: string;
  acronyms: any;
};

const IndexEntry = ([letter, acronyms]: any) => {
  return (
    <div key={letter}>
      <h2>{letter.toLocaleUpperCase()}</h2>
      {acronyms.length > 0 && <ul>{acronyms.map(Acronym)}</ul>}
    </div>
  );
};

export default IndexEntry;
