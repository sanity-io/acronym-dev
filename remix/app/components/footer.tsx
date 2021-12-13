import { HeartIcon } from "@sanity/icons";
import { SanityLogo } from "@sanity/logos";
import { Link, useParams } from "remix";

export default function Footer() {
  const { term } = useParams();

  const endpoint = `/resources/api`;
  const params = {
    q: `*[_type=='term' && slug.current == "${term}"]`,
  };
  const searchString = new URLSearchParams(params).toString();
  let queryUrl = endpoint + "?" + searchString;
  return (
    <footer className="flex flex-col md:flex-row justify-center w-full bottom-5">
      <div className="mb-6 md:mb-0">
        Want to use the{" "}
        <Link to="/api" className="bg-pink-600 text-white">
          API
        </Link>{" "}
        instead? Send a{" "}
        <Link to="/groq" className="bg-pink-600 text-white">
          GROQ
        </Link>{" "}
        query to{" "}
        <pre className="inline hover:bg-pink-600 hover:text-white">
          <a href={queryUrl}>/resources/api?q=</a>
        </pre>
        .
      </div>
      <div className="flex justify-end md:w-1/2 mx-auto prose">
        <span className="block">Made with ♥️ by</span>
        <a
          href="https://sanity.io"
          target="_blank"
          rel="noopener noreferrer"
          className="display-inline"
        >
          <SanityLogo
            aria-label="Sanity"
            className="inline text-3xl"
            style={{ marginTop: -2 }}
          />
        </a>
      </div>
    </footer>
  );
}
