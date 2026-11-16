# Shraddha Tiwari — artist site

React + Vite, plain CSS. Three pages: Home (intro and about), Work (films and paintings), Enquire (contact form). The enquiry form is sent by a Vercel serverless function (`api/enquire.js`) through Resend.

## Run

```
yarn            # install
yarn dev        # http://localhost:5173
yarn build      # validates data, builds to dist/, writes sitemap if site.url is set
```

The enquiry form needs the Vercel function, so it only works on the deployed site, or locally with `vercel dev`.

## Where things are

| To change…                       | Edit                                                                      |
| -------------------------------- | ------------------------------------------------------------------------- |
| Name, tagline, email, links, nav | `src/data/site.js`                                                        |
| Films on the Work page           | `src/data/projects.js`                                                    |
| Bio, paintings, exhibitions      | `src/data/about.js`                                                       |
| Colors, fonts, spacing           | top of `src/index.css` (`:root`)                                          |
| Enquiry options                  | `enquiryTypes` in `src/data/site.js` (keep in sync with `api/enquire.js`) |
| Painting images                  | `public/images/artworks/`                                                 |

## Add a film

Copy an entry in `src/data/projects.js`:

```js
{
  slug: "my-film",
  title: "My Film",
  year: "2025",
  medium: "Stop-motion animation",
  description: "…",
  videos: [{ provider: "file", src: "https://…/my-film.mp4", title: "My Film" }],
}
```

Only direct video files (`provider: "file"`) are supported. Film order on the page follows the file order. `validate-data.mjs` checks each entry at build time. Films play muted on hover and open with sound on click.

## Add a painting

Put the image in `public/images/artworks/`, then add an entry to `artworks` in `src/data/about.js` with `title`, `medium`, `image`, and the image's pixel size `w` and `h`.

## Enquiry form

Set these environment variables in Vercel (Project Settings → Environment Variables):

- `RESEND_API_KEY`: API key from Resend.
- `ENQUIRY_TO_EMAIL`: where enquiries are delivered.
- `ENQUIRY_FROM_EMAIL`: sender on a domain verified in Resend, e.g. `Website <enquiries@yourdomain.com>`.

Enquiries have their reply-to set to the visitor's email address.

## Deploy

`vercel.json` rewrites page paths to `index.html` and leaves `/api/` alone, so it deploys to Vercel as-is: push to Git, import the repo, build command `yarn build`, output `dist`.

When the domain is known, set `site.url` in `src/data/site.js` and add a `Sitemap:` line to `public/robots.txt`.

## Known limitations

- It's a client-rendered app: without JavaScript only a notice is shown, and social-share previews use the generic home-page tags.
- The film files are still hosted on Wix (`video.wixstatic.com`). Move them to a video host or your own storage before the Wix site is closed.
- Paintings are copies of images from the artist's Sanity dataset (IAAA project). They are not linked live.
