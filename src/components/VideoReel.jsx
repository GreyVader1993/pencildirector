import { useRef } from "react";

// One film in the grid. The clip plays muted while the pointer is over it
// (or keyboard focus is on it) and resets when they leave. Clicking opens
// the film in a dialog with sound and controls.
export default function VideoReel({ project }) {
  const video = project.videos[0];
  const videoRef = useRef(null);
  const dialogRef = useRef(null);

  const previewAllowed = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: no-preference)").matches;

  const startPreview = () => {
    const v = videoRef.current;
    if (!v || !previewAllowed()) return;
    v.play().catch(() => {});
  };
  const stopPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const open = () => {
    stopPreview();
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <article className="reel">
      <button
        type="button"
        className="reel__media"
        onClick={open}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        aria-label={`Play ${project.title}`}
      >
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className="reel__cue" aria-hidden="true">
          Play
        </span>
      </button>

      <div className="reel__caption">
        <h3>{project.title}</h3>
        {(project.year || project.medium) && (
          <p className="meta">
            {[project.year, project.medium].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="reel__dialog"
        aria-label={project.title}
        onClick={(e) => e.target === dialogRef.current && close()}
        onClose={() => dialogRef.current?.querySelector("video")?.pause()}
      >
        <div className="reel__dialog-inner">
          <div className="reel__dialog-bar">
            <h3>{project.title}</h3>
            <button
              type="button"
              className="button button--small"
              onClick={close}
            >
              Close
            </button>
          </div>
          <video
            src={video.src}
            controls
            playsInline
            preload="metadata"
            className="reel__full"
          />
          {project.description && (
            <p className="reel__desc">{project.description}</p>
          )}
        </div>
      </dialog>
    </article>
  );
}
