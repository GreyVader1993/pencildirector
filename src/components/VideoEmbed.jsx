import { useState } from "react";

// Nothing from the video host is requested until the visitor presses play.
// Providers: "youtube" (id), "vimeo" (id), "file" (src to a direct .mp4).
// To change host, edit the entry in src/data/projects.js, not this file.
// One entry per provider. To support a new host, add an entry here.
//   key    which field identifies the video
//   watch  public page (or file) URL, used as the fallback link
//   embed  iframe URL; omit for providers played with a native <video>
const providers = {
  youtube: {
    key: "id",
    watch: (v) => `https://www.youtube.com/watch?v=${v.id}`,
    embed: (v) => `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`,
  },
  vimeo: {
    key: "id",
    watch: (v) => `https://vimeo.com/${v.id}`,
    embed: (v) => `https://player.vimeo.com/video/${v.id}?autoplay=1&dnt=1`,
  },
  file: {
    key: "src",
    watch: (v) => v.src,
  },
};

export default function VideoEmbed({ video }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const aspect = video.aspect || "16 / 9";
  const title = video.title || "Video";
  const provider = providers[video.provider];
  const playable = provider && video[provider.key];

  return (
    <figure className="video">
      <div className="video__frame" style={{ aspectRatio: aspect }}>
        {!playable || failed ? (
          <div className="video__fallback">
            <p>This video is unavailable right now.</p>
            {playable && <a href={provider.watch(video)}>Try opening it directly</a>}
          </div>
        ) : playing ? (
          !provider.embed ? (
            <video controls autoPlay playsInline preload="auto" onError={() => setFailed(true)}>
              <source src={video.src} type="video/mp4" />
            </video>
          ) : (
            <iframe
              src={provider.embed(video)}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )
        ) : (
          <button className="video__play" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
            {video.poster && <img src={video.poster} alt="" loading="lazy" />}
            <span className="video__label">
              <span aria-hidden="true">▶</span> Play
            </span>
          </button>
        )}
      </div>
      {(video.caption ?? video.title) && (
        <figcaption>{video.caption ?? video.title}</figcaption>
      )}
    </figure>
  );
}
