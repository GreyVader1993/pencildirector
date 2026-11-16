// Central site settings. Edit this file to change the name, links, and nav.
// Anything marked TODO is missing information the artist needs to supply.
export const site = {
  name: "Shraddha Tiwari",
  tagline: "Experimental animation, moving image, and creative education",
  intro:
    "Shraddha Tiwari makes stop-motion, mixed-media and experimental animation, and works full time as a youth program coordinator.",
  email: "hello@thepencildirector.com", // TODO: confirm this is the right address
  url: "", // TODO: production domain, e.g. "https://example.com" (used for canonical/sitemap)
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tiwari-shraddha/" },
    { label: "Instagram", href: "https://instagram.com/thepencildirector" },
  ],
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
