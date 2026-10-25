// Shared by every page: nav and footer, variant switching, copy buttons and port cards.
// Pages set data-root on <body> ("" for the home page, "../" for pages in ports/).
(() => {
const TS = window.TS;
const root = document.body.dataset.root || "";
const onHome = root === "";

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
Object.assign(TS, { $, $$, esc, root });

const home = (hash) => (onHome ? `#${hash}` : `${root}index.html#${hash}`);
TS.portHref = (p) => `${root}ports/${p.slug}.html`;

/* ---------- nav and footer ---------- */

function renderChrome() {
  const nav = $("[data-site-nav]");
  if (nav) {
    nav.outerHTML = `
      <header class="nav">
        <div class="wrap nav-row">
          <a class="brand" href="${onHome ? "#top" : `${root}index.html`}"><img src="${root}assets/icon.png" alt="" width="28" height="28">Tokyo Snow</a>
          <nav class="nav-links" aria-label="Sections">
            <a href="${home("preview")}">Preview</a>
            <a href="${home("ports")}">Ports</a>
            <a href="${home("palette")}">Palette</a>
            <a href="${home("variants")}">Variants</a>
            <a href="${home("install")}">Install</a>
          </nav>
          <div class="nav-end">
            <label class="variant-pick"><span class="sr-only">Variant</span><select data-variant-select></select></label>
            <a class="nav-gh" href="https://github.com/MatthewGadsden/tokyo-snow-vs">GitHub</a>
          </div>
        </div>
      </header>`;
  }
  const foot = $("[data-site-footer]");
  if (foot) {
    const ports = TS.PORTS.map((p) => `<li><a href="${TS.portHref(p)}">${esc(p.name)}</a></li>`).join("");
    foot.outerHTML = `
      <footer class="foot">
        <div class="wrap foot-grid">
          <div class="foot-brand">
            <a class="brand" href="${onHome ? "#top" : `${root}index.html`}"><img src="${root}assets/icon.png" alt="" width="28" height="28">Tokyo Snow</a>
            <p>A warm, dark theme from a snowy Tokyo alley at night. MIT licensed. Made by Matthew Gadsden.</p>
          </div>
          <div>
            <h3>Theme</h3>
            <ul><li><a href="${home("preview")}">Preview</a></li><li><a href="${home("palette")}">Palette</a></li><li><a href="${home("variants")}">Variants</a></li><li><a href="${home("install")}">Install</a></li></ul>
          </div>
          <div>
            <h3>Ports</h3>
            <ul>${ports}</ul>
          </div>
          <div>
            <h3>Source</h3>
            <ul><li><a href="https://github.com/MatthewGadsden/tokyo-snow-vs">tokyo-snow-vs</a></li><li><a href="https://github.com/MatthewGadsden/gaddo-arch">gaddo-arch</a></li><li><a href="https://github.com/MatthewGadsden/mgadsden-configs">mgadsden-configs</a></li><li><a href="https://github.com/MatthewGadsden/tokyo-snow-vs/issues">Issues</a></li></ul>
          </div>
        </div>
      </footer>`;
  }
  if (!$("[data-toast]")) document.body.insertAdjacentHTML("beforeend", '<div class="toast" role="status" aria-live="polite" data-toast hidden></div>');
}

/* ---------- port cards: each one is a vending-machine slot ---------- */

TS.portCard = (p) => `
  <li class="port" style="--hue: var(--${p.hue})">
    <a href="${TS.portHref(p)}">
      <div class="port-window"><span class="port-mark" aria-hidden="true">${esc(p.mark)}</span><span class="port-kind">${p.kind}</span></div>
      <div class="port-body"><strong>${esc(p.name)}</strong><span>${esc(p.desc)}</span></div>
      <div class="port-btn"><span class="lamp">${esc(p.where)}</span><span class="price" aria-label="free">¥0</span></div>
    </a>
  </li>`;

/* ---------- variants ---------- */

const STORE_KEY = "tokyo-snow-variant";
const listeners = [];
TS.current = "tokyo-snow";
TS.onVariant = (fn) => listeners.push(fn);

function readStore() {
  try { return localStorage.getItem(STORE_KEY); } catch { return null; }
}
function writeStore(v) {
  try { localStorage.setItem(STORE_KEY, v); } catch { /* storage blocked; the choice just won't persist */ }
}

TS.applyVariant = (key, { save = true } = {}) => {
  if (!TS.VARIANTS[key]) key = "tokyo-snow";
  TS.current = key;
  const v = TS.VARIANTS[key];
  const style = document.documentElement.style;
  for (const [name, hex] of Object.entries(v.colors)) style.setProperty(`--${name}`, hex);
  $('meta[name="theme-color"]')?.setAttribute("content", v.colors.night);
  $$("[data-variant-select]").forEach((s) => { s.value = key; });
  $$("[data-variant-seg] button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.variant === key)));
  $$("[data-theme-name]").forEach((el) => { el.textContent = v.label; });
  listeners.forEach((fn) => fn(key, v));
  if (save) writeStore(key);
};

function buildVariantControls() {
  const opts = Object.entries(TS.VARIANTS);
  $$("[data-variant-select]").forEach((sel) => {
    sel.innerHTML = opts.map(([k, v]) => `<option value="${k}">${esc(v.short)}</option>`).join("");
    sel.addEventListener("change", () => TS.applyVariant(sel.value));
  });
  $$("[data-variant-seg]").forEach((seg) => {
    seg.innerHTML = opts.map(([k, v]) => `<button type="button" data-variant="${k}" aria-pressed="false">${esc(v.short)}</button>`).join("");
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-variant]");
      if (b) TS.applyVariant(b.dataset.variant);
    });
  });
}

/* ---------- copy ---------- */

let toastTimer;
TS.toast = (msg) => {
  const t = $("[data-toast]");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 1800);
};

function wireCopy() {
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const text = b.dataset.copy;
    const fallback = () => {
      const target = b.closest(".cmd, .codeblock")?.querySelector("code") || b;
      const range = document.createRange();
      range.selectNodeContents(target);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      TS.toast("Selected. Press Ctrl+C to copy");
    };
    if (!navigator.clipboard?.writeText) return fallback();
    navigator.clipboard.writeText(text).then(() => TS.toast(text.length > 24 ? "Copied" : `Copied ${text}`), fallback);
  });
}

/* ---------- carrying the variant between pages ---------- */

// Storage alone isn't enough: pages opened from disk, or inside a sandboxed frame, can each get their
// own storage. So links to other pages of the site carry the variant as ?v=, which the next page reads first.
function urlVariant() {
  const v = new URLSearchParams(location.search).get("v");
  return TS.VARIANTS[v] ? v : null;
}

function carryVariant(e) {
  const a = e.target.closest("a[href]");
  if (!a) return;
  const href = a.getAttribute("href");
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) return; // other sites and same-page anchors
  const url = new URL(href, location.href);
  url.searchParams.set("v", TS.current);
  a.href = url.href;
}

/* ---------- boot: pages call TS.start() after adding their own listeners ---------- */

TS.start = () => {
  buildVariantControls();
  wireCopy();
  document.addEventListener("click", carryVariant);
  document.addEventListener("auxclick", carryVariant);
  const fromUrl = urlVariant();
  TS.applyVariant(fromUrl || readStore() || "tokyo-snow", { save: Boolean(fromUrl) });
  // Back/forward can restore a page from cache with the variant it had then
  addEventListener("pageshow", (e) => {
    const stored = readStore();
    if (e.persisted && stored && stored !== TS.current) TS.applyVariant(stored, { save: false });
  });
};

renderChrome();
})();
