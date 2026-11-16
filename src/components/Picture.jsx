import { useState } from "react";

// An image that keeps its own proportions (never cropped or stretched).
// With no src, or if the file is missing, shows a labelled placeholder.
export default function Picture({ src, alt = "", caption, ratio = "4 / 3", eager = false, label = "Image to come" }) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className="picture">
      {src && !broken ? (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setBroken(true)} />
      ) : (
        <div className="placeholder" style={{ aspectRatio: ratio }} role="img" aria-label={label}>
          <span>{label}</span>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
