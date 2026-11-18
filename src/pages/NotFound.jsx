import { Link } from "react-router-dom";
import usePageMeta from "../components/usePageMeta";

export default function NotFound() {
  usePageMeta("Not found");
  return (
    <section className="section">
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to the home page →</Link>
      </p>
    </section>
  );
}
