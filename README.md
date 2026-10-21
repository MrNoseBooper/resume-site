# Resume for any usecase regarding the person (Christopher Foo Chia Keith)

A static, animated resume site — plain HTML/CSS/JS, no build step. Deploys to Vercel as-is.

## Editing content

Everything you'll normally change lives in **`js/content.js`**:

- **`profile`** — name, roles (typed out in the hero), tagline, location, email, social links, CV link.
- **`sections`** — the page, top to bottom. Each entry is one section.
  - **Reorder**: move entries up or down.
  - **Hide**: set `enabled: false` (or delete the entry).
  - **Add**: copy an entry, give it a unique `id`, and fill it in.
  - **Keep out of the nav**: `nav: false`. Shorter nav text: `navLabel: "..."`.
- **`settings`** — optional accent colour overrides (light / dark). The base palette lives at the top of `css/style.css`.

### Section types

| type       | what it shows |
|------------|---------------|
| `hero`     | Name, typed roles, photo, call-to-action buttons |
| `about`    | Intro paragraphs, quick facts, animated counters |
| `timeline` | Work / education / awards with filter buttons and a scroll-drawn line |
| `skills`   | Animated skill bars (`level: 0–100`) or chips (no level) |
| `projects` | Project cards with tags, optional image, and links |
| `github`   | Live GitHub stats, top languages, contribution chart, top repos |
| `list`     | Generic cards — certifications, awards, publications… |
| `contact`  | Email button + socials |
| `custom`   | Any raw HTML you write |

### Your photo

Put a square image at `assets/profile.jpg`. Until then, your initials are shown.

## Adding a brand-new section type

1. Add a renderer to `renderers` in `js/sections.js` that returns an HTML string.
2. (Optional) add an `init` hook in the same file for behaviour that runs after render.
3. Use it in `content.js` with `type: "yourType"`.

Add `class="reveal"` to any element to make it fade in on scroll, `style="--i:N"` to stagger it, and `class="card"` for the bordered card style.

## Running locally

Open `index.html` directly, or serve the folder (e.g. `npx serve .`).
