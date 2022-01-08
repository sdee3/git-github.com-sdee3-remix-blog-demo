import { FC } from "react";
import {
  Outlet,
  LiveReload,
  Link,
  Links,
  Meta,
  ErrorBoundaryComponent,
  useLoaderData,
  LoaderFunction,
} from "remix";
import globalStylesUrl from "~/styles/global.css";
import { getUser } from "~/utils/session.server";

interface DocumentProps {
  title?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    user,
  };
  return data;
};

export const meta = () => {
  const description = "A cool blog built with Remix.";
  const keywords = "remix blog, react remix blog demo";

  return {
    description,
    keywords,
  };
};

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];

const Layout: FC = ({ children }) => {
  const { user } = useLoaderData();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">
          {user ? (
            <li>
              <form action="/auth/logout" method="POST">
                <button type="submit" className="btn">
                  Logout {user.username}
                </button>
              </form>
            </li>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="container">{children}</div>
    </>
  );
};

const Document: FC<DocumentProps> = ({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <title>{title ?? "Remix Blog"}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

const App = () => {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
};

const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
};

export { ErrorBoundary };

export default App;
