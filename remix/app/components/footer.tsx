import { HeartIcon } from "@sanity/icons";
import { SanityLogo } from "@sanity/logos";

export default function Footer() {
  return (
    <footer className="prose mt-40">
      <p>
        Made with ♥️ by
        <a
          href="https://sanity.io"
          target="_blank"
          rel="noopener noreferrer"
          className="display-inline"
        >
          <SanityLogo aria-label="Sanity" className="inline text-3xl" />
        </a>
      </p>
    </footer>
  );
}
