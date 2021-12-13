import Acronym from './Acronym'

const IndexEntry = ([letter, acronyms]) => {

  return (<div key={letter}>
    <h2>{letter.toLocaleUpperCase()}</h2>
    {
      acronyms.length > 0 && (
        <ul>
          {acronyms.map(Acronym)}
        </ul>
      )
    }
  </div>)
}


export default IndexEntry;