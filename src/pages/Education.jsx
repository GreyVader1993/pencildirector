import { Link } from "react-router-dom";
import { education as e } from "../data/education";
import { site } from "../data/site";
import Picture from "../components/Picture";
import usePageMeta from "../components/usePageMeta";

const Todo = ({ children }) => <p className="todo">To be added: {children}</p>;

export default function Education() {
  usePageMeta("Education", "Youth arts programming, workshops and community-based creative learning.");
  const c = e.current;
  return (
    <>
      <section className="section">
        <h1>Education</h1>
        <p className="lede">
          Youth arts programming and creative learning, alongside an independent animation practice.
        </p>
      </section>

      <section className="section split">
        <h2>{c.heading}</h2>
        <div className="prose">
          <h3>{c.role}{c.org && `, ${c.org}`}</h3>
          {c.since && <p className="meta">Since {c.since}</p>}
          <p>{c.summary}</p>
          {c.details.length > 0 ? (
            <ul>{c.details.map((d) => <li key={d}>{d}</li>)}</ul>
          ) : (
            <Todo>organization, start year and responsibilities</Todo>
          )}
        </div>
      </section>

      <section className="section split">
        <h2>Approach</h2>
        <div className="prose">
          {e.philosophy ? <p>{e.philosophy}</p> : <Todo>a short statement on teaching and facilitation</Todo>}
        </div>
      </section>

      <section className="section split">
        <h2>Past programs and partnerships</h2>
        <div className="prose">
          {e.past.length ? (
            e.past.map((x) => (
              <p key={x.title}>
                <strong>{x.title}</strong>{x.org && `, ${x.org}`} {x.years && <span className="meta">({x.years})</span>}
                <br />{x.description}
              </p>
            ))
          ) : (
            <Todo>previous programs, nonprofit partners and dates</Todo>
          )}
        </div>
      </section>

      <section className="section split">
        <h2>Independent workshops</h2>
        <div className="prose">
          {e.workshops.length ? (
            e.workshops.map((w) => (
              <div key={w.title}>
                <Picture src={w.image} alt={w.imageAlt} label="Workshop photo to come" />
                <h3>{w.title}</h3>
                {w.audience && <p className="meta">{w.audience}</p>}
                <p>{w.description}</p>
              </div>
            ))
          ) : (
            <>
              <Todo>workshop titles, audiences and photographs</Todo>
              <Picture label="Workshop photo to come" ratio="3 / 2" />
            </>
          )}
        </div>
      </section>

      <section className="section split">
        <h2>Collaborate</h2>
        <div className="prose">
          <p>{e.collaboration}</p>
          <p><a href={`mailto:${site.email}?subject=Education%20inquiry`}>Email about a workshop or program →</a></p>
          <p className="meta"><Link to="/work">Looking for the art practice? See Work.</Link></p>
        </div>
      </section>
    </>
  );
}
