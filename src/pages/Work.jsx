import { projects } from "../data/projects";
import { about } from "../data/about";
import VideoReel from "../components/VideoReel";
import usePageMeta from "../components/usePageMeta";

export default function Work() {
  usePageMeta(
    "Work",
    "Experimental animation, stop-motion, and paintings and mixed-media work by Shraddha Tiwari.",
  );
  const films = projects.filter((p) => p.videos[0]?.provider === "file");

  return (
    <>
      <section className="section" aria-labelledby="work-heading">
        <h1 id="work-heading">Work</h1>
        <p className="lede">Films and animation.</p>
        <p className="meta">
          Hover over a film to preview it. Select it to watch with sound.
        </p>

        <div className="reel-grid">
          {films.map((p) => (
            <VideoReel key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="paintings-heading">
        <h2 id="paintings-heading">Paintings and mixed media</h2>
        <ul className="art-grid plain">
          {about.artworks.map((a) => (
            <li key={a.title} className="art">
              <figure>
                <img
                  src={a.image}
                  alt={a.medium ? `${a.title}: ${a.medium}` : a.title}
                  width={a.w}
                  height={a.h}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span className="art__title">{a.title}</span>
                  {a.medium && <span className="meta"> · {a.medium}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
