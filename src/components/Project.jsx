export default function Project({ project, featured = false }) {
  const { name, description, tech, github, demo } = project;
  return (
    <article className={`card project${featured ? ' featured' : ''}`}>
      {featured ? (
        <div className="preview strip" aria-hidden="true"><span /><span /><span /><span /></div>
      ) : (
        <div className="preview ph" aria-hidden="true">Project image</div>
      )}
      <div className="pbody">
        {featured && <span className="tag">Featured project</span>}
        <h3>{name}</h3>
        <p>{description}</p>
        <ul className="pills">{tech.map((t, i) => <li key={i}>{t}</li>)}</ul>
        <div className="actions">
          {github && <a className="btn btn-sm" href={github}>GitHub</a>}
          {demo && <a className="btn btn-sm btn-ghost" href={demo}>Live Demo</a>}
        </div>
      </div>
    </article>
  );
}
