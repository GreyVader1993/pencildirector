// Central site settings. Edit this file to change the name, links, and nav.
// Anything marked TODO is missing information the artist needs to supply.
export const site = {
  name: "Shraddha Tiwari",
  tagline: "Experimental animation, moving image, and creative education",
  intro:
    "Shraddha Tiwari makes stop-motion, mixed-media and experimental animation, and works full time as a youth program coordinator.",
  email: "contact@thepencildirector.com",
  url: "", // TODO: production domain, e.g. "https://example.com" (used for canonical/sitemap)
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tiwari-shraddha/" },
    { label: "Instagram", href: "https://instagram.com/thepencildirector" },
  ],
  // Public Turnstile site key, set in the environment as TURNSTILE_SITE_KEY (see vite.config.js).
  // It must belong to the same widget as TURNSTILE_SECRET_KEY.
  turnstileSiteKey: import.meta.env.TURNSTILE_SITE_KEY,
  // Options shown in the enquiry form. Must match TYPES in api/enquire.js.
  enquiryTypes: [
    "Commission",
    "Exhibition or screening",
    "Workshop or education",
    "Collaboration",
    "Other",
  ],
  nav: [
    { label: "Work", to: "/work" },
    { label: "About", to: "/#about" },
    { label: "Enquire", to: "/contact" },
  ],
};
