import { Link } from "react-router-dom";
import Picture from "./Picture";

export default function ProjectCard({ project }) {
  const meta = [project.year, project.medium].filter(Boolean).join(" · ");
  return (
    <article className="card">
      <Link to={`/work/${project.slug}`} className="card__link">
        <Picture src={project.cover} alt={project.coverAlt || ""} ratio="16 / 10" label="Still to come" />
        <h3>{project.title}</h3>
        {meta && <p className="meta">{meta}</p>}
      </Link>
    </article>
  );
}
