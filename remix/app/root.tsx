import {
  NavLink,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";

import styles from "./tailwind.css";
import Footer from "./components/footer";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>It's us. Not you.</p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen p-8">
      <header className="mb-12">
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center justify-center py-4 space-x-5 text-base md:mr-auto md:ml-4 md:py-1 md:pl-4"
        >
          <NavLink
            to="/"
            className="border-b-2 border-transparent hover:border-gray-500 hover:text-gray-900"
          >
            Home
          </NavLink>
          <a
            href="https://www.sanity.io"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b-2 border-transparent hover:border-gray-500 hover:text-gray-900"
          >
            Sanity.io
          </a>
          <a
            href="https://github.com/sanity-io/acronym-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b-2 border-transparent hover:border-gray-500 hover:text-gray-900"
          >
            GitHub
          </a>
        </nav>
        <Link to="/" title="Home" className="w-full text-center">
          <h1 className="font-black text-9xl ">
            <span className="text-pink-600 alternateColor">a</span>
            <span className="text-indigo-600 alternateColor">c</span>
            <span className="text-pink-600 alternateColor">r</span>
            <span className="text-indigo-600 alternateColor">o</span>
            <span className="text-pink-600 alternateColor">n</span>
            <span className="text-indigo-600 alternateColor">y</span>
            <span className="text-pink-600 alternateColor">m</span>
            <span className="text-indigo-600 alternateColor">.</span>
            <span className="text-pink-600 alternateColor">d</span>
            <span className="text-indigo-600 alternateColor">e</span>
            <span className="text-pink-600 alternateColor">v</span>
          </h1>
        </Link>
      </header>
      <main className="flex-grow">
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
