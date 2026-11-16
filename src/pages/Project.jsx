import { Link, useParams } from "react-router-dom";
import { findProject, projects } from "../data/projects";
import VideoEmbed from "../components/VideoEmbed";
import Picture from "../components/Picture";
import usePageMeta from "../components/usePageMeta";
import NotFound from "./NotFound";

export default function Project() {
  const { slug } = useParams();
  const p = findProject(slug);
  usePageMeta(p?.title, p?.description?.slice(0, 160));
  if (!p) return <NotFound />;

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const facts = [
    ["Year", p.year],
    ["Medium", p.medium],
    ["Duration", p.duration],
    ["Credits", p.credits?.join("; ")],
    ["Screenings", p.screenings?.join("; ")],
  ].filter(([, v]) => v);

  return (
    <article className="section project">
      <p className="meta"><Link to="/work">← Work</Link></p>
      <h1>{p.title}</h1>
      {(p.videos ?? []).map((v) => <VideoEmbed key={v.src || v.id} video={v} />)}
      <div className="project__text prose">
        <p>{p.description}</p>
        {facts.length > 0 && (
          <dl>
            {facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        )}
      </div>
      {p.images?.map((im) => <Picture key={im.src} {...im} />)}
      <p className="next"><Link to={`/work/${next.slug}`}>Next: {next.title} →</Link></p>
    </article>
  );
}
