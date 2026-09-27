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
- **`settings`** — accent colours.

### Section types

| type       | what it shows |
|------------|---------------|
| `hero`     | Name, typed roles, photo, call-to-action buttons |
| `about`    | Intro paragraphs, quick facts, animated counters |
| `timeline` | Work / education / awards with filter buttons and a scroll-drawn line |
| `skills`   | Animated skill bars (`level: 0–100`) or chips (no level) |
| `projects` | Project cards with tags, optional image, and links |
| `github`   | Live GitHub stats, top languages, contribution chart, top repos, achievements link |
| `list`     | Generic cards — certifications, awards, publications… |
| `contact`  | Email button + socials |
| `custom`   | Any raw HTML you write |

### Your photo

Put a square image at `assets/profile.jpg`. Until then, your initials are shown.

### GitHub achievements

GitHub doesn't expose achievements through its API, so list the slugs you've earned in the `github` section's `achievements` array (e.g. `"pull-shark"`, `"quickdraw"`, `"yolo"`) — they'll show as badges next to a link to your achievements tab.

## Adding a brand-new section type

1. Add a renderer to `renderers` in `js/sections.js` that returns an HTML string.
2. (Optional) add an `init` hook in the same file for behaviour that runs after render.
3. Use it in `content.js` with `type: "yourType"`.

Add `class="reveal"` to any element to make it fade in on scroll, `style="--i:N"` to stagger it, and `class="card tilt"` for the hover-tilt card style.

## Running locally

Open `index.html` directly, or serve the folder (e.g. `npx serve .`).
