import { about as a } from "../data/about";
import { site } from "../data/site";
import Picture from "../components/Picture";
import usePageMeta from "../components/usePageMeta";

export default function About() {
  usePageMeta("About", "Biography, methods and background of Shraddha Tiwari.");
  return (
    <>
      <section className="section">
        <h1>About</h1>
      </section>

      <section className="section split">
        <Picture src={a.portrait} alt={a.portraitAlt} ratio="4 / 5" label="Portrait to come" />
        <div className="prose">
          <p className="lede">{site.intro}</p>
          {a.bio.length ? a.bio.map((t) => <p key={t}>{t}</p>) : (
            <p className="todo">To be added: a short biography in the artist’s own words.</p>
          )}
          {(site.cv || site.statement) && (
            <p>
              {site.cv && <a href={site.cv}>Download CV</a>}
              {site.cv && site.statement && " · "}
              {site.statement && <a href={site.statement}>Artist statement</a>}
            </p>
          )}
        </div>
      </section>

      <section className="section split">
        <h2>Methods</h2>
        <ul className="prose">{a.methods.map((m) => <li key={m}>{m}</li>)}</ul>
      </section>

      <section className="section split">
        <h2>Background</h2>
        <div className="prose">
          {a.background.length
            ? a.background.map((b) => <p key={b.text}><span className="meta">{b.year}</span> {b.text}</p>)
            : <p className="todo">To be added: education and professional background.</p>}
        </div>
      </section>

      <section className="section split">
        <h2>Exhibitions &amp; screenings</h2>
        <div className="prose">
          {a.exhibitions.map((x) => <p key={x.text}><span className="meta">{x.year}</span> {x.text}</p>)}
        </div>
      </section>
      {a.honors?.length > 0 && (
        <section className="section split">
          <h2>Honors &amp; awards</h2>
          <ul className="prose">{a.honors.map((h) => <li key={h}>{h}</li>)}</ul>
        </section>
      )}
    </>
  );
}
