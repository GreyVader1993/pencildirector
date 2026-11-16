// One entry per project. To add a project, copy an entry and edit it.
//
//   slug      URL piece: /work/<slug>  (lowercase, hyphens)
//   title, year, medium, description   (year/medium can be left out until known)
//   cover     optional image in /public/images/work/, e.g. "/images/work/joute.webp"
//   coverAlt  describe the image for screen readers
//   featured  true = shown on the home page
//   videos    list of { provider, src|id, title, caption, aspect }
//               provider: "youtube" (id) | "vimeo" (id) | "file" (src: direct .mp4 URL)
//               aspect:   optional, e.g. "16 / 9" (default) or "4 / 5"
//   credits, duration, screenings   optional
//   images    optional extra stills: { src, alt, caption }
//
// Descriptions below come from the existing site; year/medium were not
// supplied, so they are left out rather than guessed.
const wix = (id, quality = "1080p") =>
  `https://video.wixstatic.com/video/695feb_${id}/${quality}/mp4/file.mp4`;

export const projects = [
  {
    slug: "joute",
    title: "Joute",
    medium: "Stop-motion puppet animation",
    featured: true,
    description:
      "A stop-motion puppet animation created in collaboration with Theodora Skipitares for the multimedia exhibition Haiti/Greece, which opened at the Spetses Ecclesiastical Museum in August 2021 in Spetses, Greece, and was to travel to several Greek cities.",
    credits: ["In collaboration with Theodora Skipitares"],
    videos: [
      {
        provider: "file",
        src: wix("cb7b0a9043fc4bd3a5bccdc861e12c4b"),
        title: "Joute",
      },
    ],
  },
  {
    slug: "tatva",
    title: "Tatva",
    medium: "Experimental stop-motion animation",
    featured: true,
    description:
      "Tatva, meaning the elements of nature, is a short experimental stop-motion animation inspired by the light shows of ancient times. The film is metaphorical and tries to create the feeling of the elements. “How it all started with a big bang and will end in no time.”",
    videos: [
      {
        provider: "file",
        src: wix("0c876e6794494665b6c4485be610eb4e"),
        title: "Tatva",
      },
    ],
  },
  {
    slug: "neer-the-dream",
    title: "Neer — The Dream",
    featured: true,
    description:
      "“I don’t dream much, or you can say I can’t remember my dreams very often — I just see flashes of things or faces. But recently I have started dreaming a lot (since I’ve been in lockdown) and one of the constant themes is being locked out or a feeling of being stuck. One of the most common textures is water.”",
    videos: [
      {
        provider: "file",
        src: wix("a8bbaf9e65964412be2dbc2bedeb488d"),
        title: "Neer — The Dream",
      },
    ],
  },
  {
    slug: "transitions",
    title: "Transitions",
    medium: "Experimental mixed media",
    description:
      "A short experimental mixed-media work based on the history of film and motion pictures.",
    videos: [
      {
        provider: "file",
        src: wix("e25b7f2d83da4220826780ce6fed994c", "720p"),
        title: "Transitions",
      },
    ],
  },
  {
    slug: "stop-the-motion",
    title: "Stop the Motion",
    medium: "Stop-motion puppet animation",
    description:
      "A stop-motion puppet animation created in collaboration with Theodora Skipitares for the multimedia exhibition Haiti/Greece, at the Spetses Ecclesiastical Museum in Spetses, Greece.",
    credits: ["In collaboration with Theodora Skipitares"],
    videos: [
      {
        provider: "file",
        src: wix("89581d15c7fe4467a83b5c086b91cf0e"),
        title: "Stop the Motion, part 1",
      },
      {
        provider: "file",
        src: wix("015ed894c2134813b6fb6fac105c0696"),
        title: "Stop the Motion, part 2",
      },
    ],
  },
  {
    slug: "who-am-i",
    title: "Who Am I",
    medium: "Mixed media, p5.js",
    description:
      "An artist’s identity is one of the most important parts of their work: where they come from and what their roots are. “How the world views you, how you view yourself, and how you view others.” Created with p5.js.",
    videos: [
      {
        provider: "file",
        src: wix("1fb42600364d499496bdc14c29d4d156"),
        title: "Who Am I",
      },
    ],
  },
  {
    slug: "coffee-beans",
    title: "Coffee Beans",
    medium: "Pixilation stop-motion",
    description: "A pixilation stop-motion short film.",
    videos: [
      {
        provider: "file",
        src: wix("729fe45622604ee19ed97465221431da"),
        title: "Coffee Beans",
      },
    ],
  },
  {
    slug: "altered-realities",
    title: "Altered Realities",
    medium: "Short film",
    description:
      "A short film about how a story gets altered as it is passed on.",
    videos: [
      {
        provider: "file",
        src: wix("804924807cdc40d89dfd224805223f8c"),
        title: "Altered Realities",
      },
    ],
  },
  {
    slug: "happy-puppet",
    title: "Happy Puppet",
    medium: "Puppet video",
    description: "A happy video of a happy puppet made by a happy puppeteer.",
    videos: [
      {
        provider: "file",
        src: wix("e714adc713fd48e1aef9420c9060275c"),
        title: "Happy Puppet",
      },
    ],
  },
  {
    slug: "colors-of-freedom",
    title: "Colors of Freedom",
    description:
      "Based on Jawaharlal Nehru’s “Tryst with Destiny” speech: “Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge, not wholly or in full measure, but very substantially.”",
    videos: [
      {
        provider: "file",
        src: wix("ce07570ecb594a36abdac2f23be9f996"),
        title: "Colors of Freedom",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const findProject = (slug) => projects.find((p) => p.slug === slug);
