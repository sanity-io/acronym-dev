import { Link } from "remix";

type Acronym = {
  _id: string;
  slug: {
    current: string;
  };
  term: string;
};

const Acronym = ({ _id, slug, term }: Acronym) => {
  return (
    <li key={_id}>
      <Link to={`/${slug?.current}`}>{term}</Link>
    </li>
  );
};

export default Acronym;
