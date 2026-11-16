# Shraddha Tiwari — portfolio

React + Vite, plain CSS, no backend. Content lives in `src/data/`; layout lives in `src/components` and `src/pages`.

## Run

```
yarn            # install
yarn dev        # http://localhost:5173
yarn build      # outputs dist/ (and dist/sitemap.xml once site.url is set)
```

## Where things are

| To change…                                  | Edit                                    |
| ------------------------------------------- | --------------------------------------- |
| Name, tagline, email, social links, CV, nav | `src/data/site.js`                      |
| Projects (add / edit / reorder)             | `src/data/projects.js`                  |
| Education page (role, workshops, past work) | `src/data/education.js`                 |
| About page (bio, methods, exhibitions)      | `src/data/about.js`                     |
| Colors, fonts, spacing                      | top of `src/index.css` (`:root`)        |
| Images                                      | `public/images/{work,education,about}/` |

Anything marked `TODO` in those files, or shown on the site as "To be added", is information still needed from the artist.

## Add a project

Copy an entry in `src/data/projects.js`:

```js
{
  slug: "my-film",              // becomes /work/my-film
  title: "My Film",
  year: "2025",
  medium: "Hand-drawn animation",
  featured: true,               // true = appears on the home page
  cover: "/images/work/my-film.webp",
  coverAlt: "Describe the still",
  description: "…",
  videos: [{ provider: "vimeo", id: "123456789", title: "My Film" }],
}
```

Order in the file is the order on the site. Images: use WebP, around 1600px on the long edge, named `project-slug.webp` (extra stills: `project-slug-2.webp`). Images are never cropped.

## Embed a video

`provider` is one of:

- `youtube` + `id` (the part after `v=`). Uses `youtube-nocookie.com`.
- `vimeo` + `id` (the number in the URL). Adds `dnt=1`. For unlisted videos the id may need the hash: use `id: "123456789?h=abcdef"`-style only if Vimeo's embed code shows one.
- `file` + `src` (direct `.mp4` URL).

Optional: `poster` (image shown before play), `aspect` (e.g. `"4 / 5"`), `caption`. Players load only when the visitor presses Play: no autoplay, no third-party requests until then. To change host, change `provider` and `id`/`src`; nothing else.

**Current videos are hosted on Wix** (`video.wixstatic.com`). They work today, but if the old Wix site/plan is closed those links will likely stop working. Move the files to Vimeo/YouTube before then.

### Video hosting notes

Not verified in this build (no network research was run), so check current terms before choosing:

- YouTube: free, reliable embeds; may show ads and "related videos". "Unlisted" is not private, anyone with the link can watch.
- Vimeo: cleaner player; the free plan has tight storage/upload limits and fewer privacy options, so check the current plan page.
- Self-hosting: not recommended (bandwidth cost).

## Deploy

`vercel.json` already rewrites all paths to `index.html`, so it works on Vercel as-is (push to Git, import the repo, build command `yarn build`, output `dist`). On Netlify or Cloudflare Pages use the same build settings, plus a rule sending `/*` to `/index.html` (status 200). Check each host's current free-tier limits first. A custom domain and HTTPS are available on all three.

When the domain is known, set `site.url` in `src/data/site.js` (enables the sitemap and canonical URLs) and add a `Sitemap:` line to `public/robots.txt`.

## Known limitations

- It is a client-rendered single-page app: without JavaScript only a notice is shown, and social-share previews use the generic home-page tags rather than per-project ones. Pre-rendering (e.g. moving to Astro) would fix both if needed.
- No stills/posters exist yet, so cards and video players show labelled placeholders.
