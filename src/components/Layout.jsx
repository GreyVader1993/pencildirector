import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { site } from "../data/site";

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <Link to="/" className="wordmark">
        {site.name}
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-nav"
        aria-label="Primary"
        className={open ? "nav is-open" : "nav"}
      >
        {site.nav.map((n) => (
          <NavLink key={n.to} to={n.to}>
            {n.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <ul>
        {site.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="meta">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    // Leave back/forward navigation to the browser's own scroll restoration.
    if (navType === "POP") return;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo(0, 0);
  }, [pathname, hash, navType]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
