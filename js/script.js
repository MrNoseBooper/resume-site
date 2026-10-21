/* =====================================================================
   APP — builds the page from content.js and wires up the animations.
   You shouldn't need to edit this file to change content.
   ===================================================================== */

(() => {
  const { profile, settings = {}, sections } = window.RESUME;
  const { renderers, init, esc } = window.Sections;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme colours from settings ---------- */
  const root = document.documentElement;
  // Overrides the accent per theme (both are optional; css/style.css holds the defaults).
  const accentCss = [
    settings.accent && `:root{--accent:${settings.accent}}`,
    settings.accentDark && `:root[data-theme="dark"]{--accent:${settings.accentDark}}`,
  ].filter(Boolean).join("");
  if (accentCss) document.head.insertAdjacentHTML("beforeend", `<style>${accentCss}</style>`);

  /* ---------- render sections ---------- */
  const active = sections.filter((s) => s.enabled !== false && renderers[s.type]);
  sections
    .filter((s) => !renderers[s.type])
    .forEach((s) => console.warn(`Unknown section type "${s.type}" (id: ${s.id})`));

  let number = 0;
  document.getElementById("main").innerHTML = active
    .map((s, i) => {
      if (s.type === "hero") {
        s.next = active[i + 1]?.id;
        return `<section id="${esc(s.id)}" class="section section-hero"><div class="container hero">${renderers.hero(s, profile)}</div></section>`;
      }
      number += 1;
      return `
        <section id="${esc(s.id)}" class="section section-${esc(s.type)}">
          <div class="container">
            <header class="section-head reveal">
              <span class="section-num">${String(number).padStart(2, "0")}</span>
              <h2>${esc(s.title)}</h2>
              ${s.subtitle ? `<p class="muted">${esc(s.subtitle)}</p>` : ""}
            </header>
            ${renderers[s.type](s, profile)}
          </div>
        </section>`;
    })
    .join("");

  /* ---------- nav + footer ---------- */
  const navLinks = document.getElementById("nav-links");
  navLinks.innerHTML = active
    .filter((s) => s.nav !== false && s.type !== "hero")
    .map((s) => `<li><a href="#${esc(s.id)}">${esc(s.navLabel || s.title)}</a></li>`)
    .join("");
  document.getElementById("brand").textContent = profile.name;
  document.getElementById("footer-text").textContent = `© ${new Date().getFullYear()} ${profile.fullName || profile.name}`;
  document.title = `${profile.name} | Resume`;

  const menuBtn = document.getElementById("menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      document.body.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- theme toggle ---------- */
  document.getElementById("theme-btn").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  });

  /* ---------- reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count]").forEach(countUp);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals) || 0;
    if (reduceMotion || !target) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = (target * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Call after injecting new markup (e.g. data loaded from an API).
  function refresh(scope = document) {
    scope.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
    // counters that were injected into an already-visible element
    scope.querySelectorAll(".is-visible [data-count], [data-count].is-visible").forEach(countUp);
  }
  refresh();

  /* ---------- typed roles in the hero ---------- */
  document.querySelectorAll(".typed").forEach((el) => {
    const words = JSON.parse(el.dataset.words || "[]");
    if (!words.length) return;
    if (reduceMotion || words.length === 1) {
      el.textContent = words[0];
      return;
    }
    let w = 0, c = 0, deleting = false;
    const step = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 45 : 90;
      if (!deleting && c === word.length) (deleting = true), (delay = 1600);
      else if (deleting && c === 0) (deleting = false), (w = (w + 1) % words.length), (delay = 350);
      setTimeout(step, delay);
    };
    setTimeout(step, 900);
  });

  /* ---------- timeline filters ---------- */
  document.querySelectorAll(".filters").forEach((group) => {
    const items = group.parentElement.querySelectorAll(".tl-item");
    group.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      group.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === btn));
      const f = btn.dataset.filter;
      items.forEach((it) => it.classList.toggle("is-hidden", f !== "all" && it.dataset.kind !== f));
      updateScroll();
    });
  });

  /* ---------- scroll-driven: progress bar, nav, timeline line ---------- */
  const progress = document.getElementById("progress");
  const header = document.querySelector(".site-header");
  const timelines = [...document.querySelectorAll(".timeline")];
  const sectionEls = [...document.querySelectorAll("main > section")];

  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    header.classList.toggle("is-scrolled", scrollY > 20);

    timelines.forEach((tl) => {
      const r = tl.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight * 0.7 - r.top) / r.height, 0), 1);
      tl.style.setProperty("--progress", p);
    });

    let current = sectionEls[0]?.id;
    sectionEls.forEach((s) => {
      if (s.getBoundingClientRect().top < innerHeight * 0.35) current = s.id;
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`)
    );
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateScroll();
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  updateScroll();

  /* ---------- per-section init hooks ---------- */
  const app = { refresh };
  active.forEach((s) => {
    const el = document.getElementById(s.id);
    if (init[s.type] && el) init[s.type](el, s, app);
  });

  requestAnimationFrame(() => document.body.classList.add("is-loaded"));
})();
