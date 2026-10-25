// Home page: editor preview, ports grid, palette, variants and the snowfall over the hero.
(() => {
const TS = window.TS;
const { $, $$, esc, VARIANTS, ACCENTS, BASE, ROLES, PORTS } = TS;

// Dark swatches get snow text, light ones get night text.
function onColor(hex, palette) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.42 ? palette.night : palette.snow;
}

/* ---------- ports ---------- */

let portKind = "all";

function renderPorts() {
  const q = $("#port-search").value.trim().toLowerCase();
  const shown = PORTS.filter((p) =>
    (portKind === "all" || p.kind === portKind) &&
    (!q || `${p.name} ${p.desc} ${p.kind} ${p.where}`.toLowerCase().includes(q)));
  $("[data-ports]").innerHTML = shown.map(TS.portCard).join("");
  $("[data-ports-empty]").hidden = shown.length > 0;
}

function wirePorts() {
  $("#port-search").addEventListener("input", renderPorts);
  $("[data-port-filter]").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-kind]");
    if (!b) return;
    portKind = b.dataset.kind;
    $$("[data-port-filter] button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    renderPorts();
  });
  renderPorts();
}

/* ---------- palette ---------- */

function renderSwatches() {
  const p = VARIANTS[TS.current].colors;
  const card = (name) => `
    <li class="sw" style="--c:${p[name]};--on:${onColor(p[name], p)}">
      <div class="sw-chip">
        <span class="sw-name">${name}</span>
        <button type="button" class="sw-hex" data-copy="${p[name]}" aria-label="Copy ${name} ${p[name]}">${p[name]}</button>
      </div>
      <dl class="sw-info">
        <dt>Photo</dt><dd>${esc(ROLES[name].photo)}</dd>
        <dt>Editor</dt><dd>${esc(ROLES[name].editor)}</dd>
      </dl>
    </li>`;
  $('[data-swatches="accents"]').innerHTML = ACCENTS.map(card).join("");
  $('[data-swatches="base"]').innerHTML = BASE.map(card).join("");
}

/* ---------- variants ---------- */

function renderVariants() {
  $("[data-variants]").innerHTML = Object.entries(VARIANTS).map(([key, v]) => {
    const vars = Object.entries(v.colors).map(([n, hex]) => `--v-${n}:${hex}`).join(";");
    const strip = [...ACCENTS, ...BASE].map((n) => `<span style="background:${v.colors[n]}" title="${n} ${v.colors[n]}"></span>`).join("");
    return `
      <article class="var" data-variant="${key}" style="${vars}" aria-current="false">
        <div class="var-head"><h3>${esc(v.label)}</h3><span class="var-tag">${v.tag}</span></div>
        <div class="strip" aria-hidden="true">${strip}</div>
        <p>${esc(v.about)}</p>
<pre class="var-code" aria-hidden="true"><span class="c">// ${esc(v.short.toLowerCase())}</span>
<span class="k">class</span> <span class="t">Drift</span> {
  <span class="f">melt</span>(hours) {
    <span class="k">return</span> <span class="k">this</span>.<span class="p">depth</span> - hours * <span class="n">0.4</span>;
  }
}
<span class="k">const</span> street = <span class="s">'Shinjuku'</span>;</pre>
        <button type="button" class="var-btn" data-variant="${key}">Preview ${esc(v.short)}</button>
      </article>`;
  }).join("");
  $("[data-variants]").addEventListener("click", (e) => {
    const b = e.target.closest(".var-btn");
    if (!b || b.dataset.variant === TS.current) return;
    TS.applyVariant(b.dataset.variant);
    $("#preview").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
}

/* ---------- snowfall over the hero photo ---------- */

const snow = (() => {
  const canvas = $(".snowfall");
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  let flakes = [];
  let w = 0, h = 0, raf = 0, visible = true, color = "#f1e4b5";

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: Math.min(170, Math.round(w / 9)) }, () => spawn(Math.random() * h));
    if (still.matches) draw();
  }

  function spawn(y = -4) {
    const depth = Math.random();
    return {
      x: Math.random() * w, y,
      r: 0.6 + depth * 1.9,
      vy: 0.25 + depth * 0.9,
      sway: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      a: 0.25 + depth * 0.6,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    for (const f of flakes) {
      ctx.globalAlpha = f.a;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function tick(t) {
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += f.vy;
      f.x += Math.sin(t / 1400 + f.phase) * f.sway * 0.4 - 0.12;
      if (f.y > h + 4 || f.x < -6) flakes[i] = spawn();
    }
    draw();
    raf = requestAnimationFrame(tick);
  }

  function run() {
    cancelAnimationFrame(raf);
    raf = 0;
    if (visible && !document.hidden && !still.matches) raf = requestAnimationFrame(tick);
    else draw();
  }

  return {
    start() {
      resize();
      new ResizeObserver(resize).observe(canvas);
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(canvas);
      document.addEventListener("visibilitychange", run);
      still.addEventListener?.("change", run);
      run();
    },
    recolor(c) {
      color = c;
      if (!raf) draw();
    },
  };
})();

/* ---------- boot ---------- */

TS.mountEditor($("[data-editor]"));
renderVariants();
wirePorts();
snow.start();
TS.onVariant((key, v) => {
  renderSwatches();
  snow.recolor(v.colors.snow);
  $$("[data-variants] .var").forEach((card) => card.setAttribute("aria-current", String(card.dataset.variant === key)));
});
TS.start();
})();
