import { Link } from "react-router-dom";
import { site } from "../data/site";
import { featuredProjects } from "../data/projects";
import { about } from "../data/about";
import usePageMeta from "../components/usePageMeta";

export default function Home() {
  usePageMeta("", site.tagline);
  const leadVideo = featuredProjects[0]?.videos[0];

  return (
    <>
      <section className="hero-video" aria-labelledby="intro-heading">
        {leadVideo?.provider === "file" && (
          <video
            className="hero-video__media"
            src={leadVideo.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="hero-video__scrim" />
        <div className="hero-video__content">
          <h1 id="intro-heading" className="lede">{site.tagline}</h1>
          <p className="hero-video__intro">{site.intro}</p>
          <p className="hero-video__actions">
            <Link className="button button--light" to="/work">View work</Link>
            <Link className="button button--ghost" to="/contact">Enquire</Link>
          </p>
        </div>
      </section>

      <section className="section split" id="about" aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <div className="prose">
          {about.bio.length ? (
            about.bio.map((t) => <p key={t}>{t}</p>)
          ) : (
            <p className="todo">A short biography in the artist’s own words will be added here.</p>
          )}
          <p><Link to="/contact">Commissions, screenings and collaborations →</Link></p>
        </div>
      </section>
    </>
  );
}
