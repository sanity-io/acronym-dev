import { HeartIcon } from "@sanity/icons";
import { SanityLogo } from "@sanity/logos";

export default function Footer() {
  return (
    <footer className="flex justify-center w-full bottom-5">
      <p className="flex justify-center w-1/2 mx-auto prose text-center align-middle">
        <span className="block">
        Made with ♥️ by
        </span>
        <a
          href="https://sanity.io"
          target="_blank"
          rel="noopener noreferrer"
          className="display-inline"
        >
          <SanityLogo aria-label="Sanity" className="inline text-3xl" style={{marginTop: -2}} />
        </a>
      </p>
    </footer>
  );
}
