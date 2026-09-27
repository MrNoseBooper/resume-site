/* =====================================================================
   SECTION RENDERERS — one function per section `type` in content.js.
   To create a new section type, add a renderer here (and optionally an
   `init` hook for behaviour that runs after it's on the page).
   ===================================================================== */

window.Sections = (() => {
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );

  const icons = {
    github: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" fill="currentColor" stroke="none"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    link: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/>',
    work: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    education: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    project: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    volunteer: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    fork: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5"/>',
    trophy: '<path d="M6 9H4a2 2 0 0 1 0-4h2M18 9h2a2 2 0 0 0 0-4h-2M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2-1.2.5-2 2-2 3.8M14 14.7V17c0 .6.5 1 1 1.2 1.2.5 2 2 2 3.8M18 2H6v7a6 6 0 0 0 12 0z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
  };

  const icon = (name, cls = "icon") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.link}</svg>`;

  const isExternal = (url) => /^https?:/.test(url);
  // `attrs` is an optional raw attribute string, e.g. 'style="--i:1"'.
  const anchor = (url, inner, cls = "", attrs = "") =>
    `<a href="${esc(url)}" class="${cls}" ${attrs}${
      isExternal(url) ? ' target="_blank" rel="noopener"' : ""
    }>${inner}</a>`;

  const tags = (list = []) =>
    list.length ? `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";

  const socialLinks = (profile) =>
    (profile.socials || [])
      .filter((s) => s.url)
      .map((s) => anchor(s.url, icon(s.icon), "icon-btn", `aria-label="${esc(s.label)}"`))
      .join("");

  const initials = (name) =>
    name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  /* ---------------------------- renderers ---------------------------- */

  const renderers = {
    hero(s, p) {
      const resume = p.resumePdf
        ? anchor(p.resumePdf, `${icon("file")} Download CV`, "btn btn-ghost")
        : "";
      return `
        <div class="hero-text">
          <p class="hero-hello reveal">Hello, I'm</p>
          <h1 class="hero-name reveal" style="--i:1">${esc(p.name)}</h1>
          <p class="hero-role reveal" style="--i:2">
            <span class="typed" data-words="${esc(JSON.stringify(p.roles || []))}"></span><span class="caret" aria-hidden="true"></span>
          </p>
          <p class="hero-tagline reveal" style="--i:3">${esc(p.tagline)}</p>
          <div class="hero-cta reveal" style="--i:4">
            <a href="#contact" class="btn btn-primary">Get in touch</a>
            ${resume}
            <div class="socials">${socialLinks(p)}</div>
          </div>
        </div>
        <div class="hero-photo reveal" style="--i:2">
          <div class="photo-ring">
            <div class="photo-frame">
              <img src="${esc(p.photo)}" alt="Photo of ${esc(p.name)}" onerror="this.parentElement.classList.add('no-photo')">
              <span class="photo-initials" aria-hidden="true">${esc(initials(p.name))}</span>
            </div>
          </div>
          ${p.location ? `<span class="photo-badge">${icon("pin")} ${esc(p.location)}</span>` : ""}
        </div>
        <a href="#${esc(s.next || "")}" class="scroll-cue" aria-label="Scroll down">${icon("arrow")}</a>`;
    },

    about(s) {
      const facts = (s.facts || [])
        .map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
        .join("");
      const highlights = (s.highlights || [])
        .map(
          (h, i) => `
          <div class="stat card reveal" style="--i:${i + 2}">
            <span class="stat-value"><span data-count="${Number(h.value) || 0}" data-decimals="${Number(h.decimals) || 0}">0</span>${esc(h.suffix || "")}</span>
            <span class="stat-label">${esc(h.label)}</span>
          </div>`
        )
        .join("");
      return `
        <div class="about-grid">
          <div class="about-text reveal">
            ${(s.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join("")}
            ${s.interests?.length ? `<h3 class="about-sub">Interests</h3>${tags(s.interests)}` : ""}
          </div>
          <div class="about-side">
            ${facts ? `<dl class="facts card reveal" style="--i:1">${facts}</dl>` : ""}
            ${highlights ? `<div class="stats">${highlights}</div>` : ""}
          </div>
        </div>`;
    },

    timeline(s) {
      const items = s.items || [];
      const kinds = [...new Set(items.map((it) => it.kind).filter(Boolean))];
      const filters =
        kinds.length > 1
          ? `<div class="filters reveal" role="group" aria-label="Filter timeline">
              <button class="chip is-active" data-filter="all">All</button>
              ${kinds.map((k) => `<button class="chip" data-filter="${esc(k)}">${esc(k)}</button>`).join("")}
            </div>`
          : "";
      const list = items
        .map((it, i) => {
          const body = it.points
            ? `<ul class="tl-points">${it.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>`
            : it.description
            ? `<p>${esc(it.description)}</p>`
            : "";
          const org = [it.org, it.location].filter(Boolean).map(esc).join(" · ");
          return `
            <li class="tl-item reveal" data-kind="${esc(it.kind || "")}" style="--i:${i % 3}">
              <span class="tl-dot">${icon(it.kind || "work")}</span>
              <article class="tl-card card tilt">
                <span class="tl-date">${esc(it.date)}</span>
                <h3>${esc(it.title)}</h3>
                ${org ? `<p class="tl-org">${org}</p>` : ""}
                ${body}
                ${tags(it.tags)}
              </article>
            </li>`;
        })
        .join("");
      return `${filters}<ol class="timeline"><span class="tl-line" aria-hidden="true"></span>${list}</ol>`;
    },

    skills(s) {
      return `<div class="skills-grid">${(s.groups || [])
        .map((g, gi) => {
          const bars = g.items.filter((it) => it.level != null);
          const chips = g.items.filter((it) => it.level == null);
          return `
            <div class="skill-group card reveal" style="--i:${gi}">
              <h3>${esc(g.name)}</h3>
              ${bars
                .map(
                  (it) => `
                <div class="skill">
                  <div class="skill-head"><span>${esc(it.name)}</span><span>${Number(it.level)}%</span></div>
                  <div class="bar"><span style="--level:${Number(it.level)}%"></span></div>
                </div>`
                )
                .join("")}
              ${tags(chips.map((c) => c.name))}
            </div>`;
        })
        .join("")}</div>`;
    },

    projects(s) {
      return `<div class="card-grid">${(s.items || [])
        .map((p, i) => {
          const links = (p.links || [])
            .filter((l) => l.url)
            .map((l) => anchor(l.url, `${esc(l.label)} ${icon("link")}`, "text-link"))
            .join("");
          return `
            <article class="project card tilt reveal" style="--i:${i % 3}">
              ${p.image ? `<div class="project-img"><img src="${esc(p.image)}" alt="" loading="lazy"></div>` : ""}
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.description)}</p>
              ${tags(p.tags)}
              ${links ? `<div class="project-links">${links}</div>` : ""}
            </article>`;
        })
        .join("")}</div>`;
    },

    github(s) {
      const u = esc(s.username);
      const badges = (s.achievements || [])
        .map(
          (slug) =>
            `<img src="https://github.githubassets.com/images/modules/profile/achievements/${esc(slug)}-default.png" alt="${esc(slug.replace(/-/g, " "))}" title="${esc(slug.replace(/-/g, " "))}" loading="lazy">`
        )
        .join("");
      const stat = (key, label) =>
        `<div class="stat card reveal"><span class="stat-value" data-gh="${key}">—</span><span class="stat-label">${label}</span></div>`;
      const accent = (window.RESUME.settings?.accent || "#7c5cff").replace("#", "");
      return `
        <div class="gh">
          <div class="gh-top">
            <div class="gh-profile card reveal">
              <img class="gh-avatar" data-gh="avatar" alt="" hidden>
              <div>
                <h3 data-gh="name">@${u}</h3>
                <p class="muted" data-gh="bio"></p>
                ${anchor(`https://github.com/${u}`, `${icon("github")} Follow on GitHub`, "btn btn-ghost btn-sm")}
              </div>
            </div>
            <div class="stats stats-4">
              ${stat("repos", "Public repos")}${stat("stars", "Stars earned")}${stat("followers", "Followers")}${stat("years", "Years on GitHub")}
            </div>
          </div>

          ${anchor(
            `https://github.com/${u}?tab=achievements`,
            `<span class="gh-ach-icon">${icon("trophy")}</span>
             <span class="gh-ach-text"><strong>GitHub Achievements</strong><span class="muted">See the badges I've unlocked on GitHub</span></span>
             ${badges ? `<span class="gh-badges">${badges}</span>` : ""}
             ${icon("link", "icon gh-ach-arrow")}`,
            "gh-achievements card reveal"
          )}

          <div class="gh-langs card reveal" hidden>
            <h3>Top languages</h3>
            <div class="lang-bar" data-gh="langbar"></div>
            <ul class="lang-legend" data-gh="legend"></ul>
          </div>

          ${
            s.contributionChart
              ? `<div class="gh-chart card reveal">
                  <h3>Contributions</h3>
                  <img src="https://ghchart.rshah.org/${accent}/${u}" alt="GitHub contribution chart for ${u}" loading="lazy" onerror="this.closest('.gh-chart').remove()">
                </div>`
              : ""
          }

          ${s.repoCount ? `<div class="card-grid gh-repos" data-gh="repo-list"></div>` : ""}
          <p class="gh-error muted" hidden>Couldn't reach GitHub right now — ${anchor(`https://github.com/${u}`, "view my profile directly", "text-link")}.</p>
        </div>`;
    },

    list(s) {
      return `<div class="card-grid">${(s.items || [])
        .map((it, i) => {
          const inner = `
            ${it.date ? `<span class="tl-date">${esc(it.date)}</span>` : ""}
            <h3>${esc(it.title)}</h3>
            ${it.subtitle ? `<p class="tl-org">${esc(it.subtitle)}</p>` : ""}
            ${it.description ? `<p>${esc(it.description)}</p>` : ""}`;
          return it.url
            ? anchor(it.url, inner, "card tilt reveal list-card", `style="--i:${i % 3}"`)
            : `<div class="card tilt reveal list-card" style="--i:${i % 3}">${inner}</div>`;
        })
        .join("")}</div>`;
    },

    contact(s, p) {
      return `
        <div class="contact card reveal">
          <p class="contact-msg">${esc(s.message)}</p>
          ${p.phone ? anchor(`tel:${p.phone.replace(/[^\d+]/g, "")}`, esc(p.phone), "text-link") : ""}
          ${p.email ? anchor(`mailto:${p.email}`, `${icon("mail")} ${esc(p.email)}`, "btn btn-primary btn-lg") : ""}
          <div class="socials">${socialLinks(p)}</div>
        </div>`;
    },

    custom(s) {
      return `<div class="custom card reveal">${s.html || ""}</div>`;
    },
  };

  /* ------------------------------ hooks ------------------------------ */

  const langColors = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", Java: "#b07219",
    HTML: "#e34c26", CSS: "#663399", "C++": "#f34b7d", C: "#555555", "C#": "#178600",
    Go: "#00ADD8", Rust: "#dea584", Kotlin: "#A97BFF", Swift: "#F05138", PHP: "#4F5D95",
    Ruby: "#701516", Shell: "#89e051", Dart: "#00B4AB", Vue: "#41b883", "Jupyter Notebook": "#DA5B0B",
  };
  const langColor = (name) =>
    langColors[name] || `hsl(${[...name].reduce((h, c) => h + c.charCodeAt(0), 0) % 360} 60% 55%)`;

  async function fetchGitHub(username) {
    const key = `gh:${username}`;
    try {
      const cached = JSON.parse(sessionStorage.getItem(key));
      if (cached && Date.now() - cached.t < 30 * 60 * 1000) return cached.data;
    } catch {}
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`).then((r) => (r.ok ? r.json() : Promise.reject(r))),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then((r) =>
        r.ok ? r.json() : Promise.reject(r)
      ),
    ]);
    const data = { user, repos };
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
    } catch {}
    return data;
  }

  const init = {
    async github(el, s, app) {
      const q = (k) => el.querySelector(`[data-gh="${k}"]`);
      try {
        const { user, repos } = await fetchGitHub(s.username);
        const own = repos.filter((r) => !r.fork);

        if (user.avatar_url) {
          q("avatar").src = user.avatar_url;
          q("avatar").hidden = false;
        }
        q("name").textContent = user.name || `@${user.login}`;
        q("bio").textContent = user.bio || `@${user.login}`;

        const counts = {
          repos: user.public_repos,
          stars: own.reduce((n, r) => n + r.stargazers_count, 0),
          followers: user.followers,
          years: Math.max(1, new Date().getFullYear() - new Date(user.created_at).getFullYear()),
        };
        for (const [k, v] of Object.entries(counts)) {
          q(k).innerHTML = `<span data-count="${v}">0</span>`;
        }

        const langs = {};
        own.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1));
        const total = Object.values(langs).reduce((a, b) => a + b, 0);
        const top = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6);
        if (total) {
          q("langbar").innerHTML = top
            .map(([n, c]) => `<span style="--w:${(c / total) * 100}%;background:${langColor(n)}" title="${esc(n)}"></span>`)
            .join("");
          q("legend").innerHTML = top
            .map(([n, c]) => `<li><i style="background:${langColor(n)}"></i>${esc(n)} <span class="muted">${Math.round((c / total) * 100)}%</span></li>`)
            .join("");
          el.querySelector(".gh-langs").hidden = false;
        }

        const reposEl = q("repo-list");
        if (reposEl) {
          const picks = own
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, s.repoCount);
          reposEl.innerHTML = picks
            .map(
              (r, i) =>
                anchor(
                  r.html_url,
                  `<h3>${icon("project")} ${esc(r.name)}</h3>
                   <p>${esc(r.description || "No description yet.")}</p>
                   <div class="repo-meta">
                     ${r.language ? `<span><i style="background:${langColor(r.language)}"></i>${esc(r.language)}</span>` : ""}
                     <span>${icon("star")} ${r.stargazers_count}</span>
                     <span>${icon("fork")} ${r.forks_count}</span>
                   </div>`,
                  "repo card tilt reveal",
                  `style="--i:${i % 3}"`
                )
            )
            .join("");
        }
      } catch (err) {
        console.warn("GitHub fetch failed", err);
        el.querySelector(".gh-error").hidden = false;
        el.querySelectorAll('[data-gh="repo-list"], .gh-langs').forEach((n) => n.remove());
      }
      app.refresh(el);
    },
  };

  return { renderers, init, esc, icon };
})();
