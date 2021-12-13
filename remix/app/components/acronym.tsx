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
    <li key={_id} className="p-0 m-0 mb-6 text-6xl list-none">
      <Link
        className="underline hover:decoration-pink-600"
        to={`/${slug?.current}`}
      >
        {term}
      </Link>
    </li>
  );
};

export default Acronym;
