import Link from 'next/link'

const Acronym = ({ _id, slug, term }) => {
  return (<li key={_id}>
    <Link href={`/${slug?.current}`}>
      <a>{term}</a>
    </Link>
  </li>)
}

export default Acronym