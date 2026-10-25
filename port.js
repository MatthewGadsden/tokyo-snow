// A port's page: header, a live mock of the app in the palette, install steps, where each colour
// goes, and details. The page's <body data-port="slug"> picks the entry from TS.PORTS.
(() => {
const TS = window.TS;
const { $, $$, esc, root } = TS;
const port = TS.PORTS.find((p) => p.slug === document.body.dataset.port);
const KIND = { editor: "Editors", desktop: "Desktop", terminal: "Terminal" };
const SHELL_NAME = { "tokyo-snow": "lamplit-glow", "neon-alley": "neon-alley", "vending-glow": "vending-glow" };

/* ---------- mocks ---------- */

const pad2 = (n) => String(n).padStart(2, "0");
const clock = () => {
  const d = new Date();
  return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds(), d };
};

const NVIM_SRC = `
«c:-- feline statusline in the tokyo-snow palette (~/.config/tokyo-snow.theme)»
«k:local» «v:tokyo_snow» «o:=» «pu:{»
    «p:fg» «o:=» «s:'#f1e4b5'»«pu:,»        «c:-- snow»
    «p:bg» «o:=» «s:'#1c1c1a'»«pu:,»        «c:-- night»
    «p:black» «o:=» «s:'#2a2a28'»«pu:,»     «c:-- shadow»
    «p:skyblue» «o:=» «s:'#6fc28a'»«pu:,»   «c:-- pine»
    «p:cyan» «o:=» «s:'#c4c88e'»«pu:,»      «c:-- sage»
    «p:green» «o:=» «s:'#a6d46c'»«pu:,»     «c:-- moss»
    «p:oceanblue» «o:=» «s:'#3a3933'»«pu:,» «c:-- slate»
    «p:magenta» «o:=» «s:'#d5583d'»«pu:,»   «c:-- neon»
    «p:orange» «o:=» «s:'#db814c'»«pu:,»    «c:-- ember»
    «p:violet» «o:=» «s:'#e1b568'»«pu:,»    «c:-- amber»
«pu:}»

«k:return» «pu:{»
  «s:'feline-nvim/feline.nvim'»«pu:,»
  «p:priority» «o:=» «n:1001»«pu:,»
  «p:enabled» «o:=» «n:true»«pu:,»
  «p:config» «o:=» «k:function»«pu:(»«pu:)» «f:require»«pu:(»«s:'feline'»«pu:)»«pu:.»«f:setup»«pu:(»«pu:{» «p:theme» «o:=» «v:tokyo_snow» «pu:}»«pu:)» «k:end»«pu:,»
«pu:}»`;

function nvimMock() {
  const lines = TS.highlight(NVIM_SRC.replace(/^\n+/, "")).split("\n");
  const cur = 12;
  const code = lines.map((l, i) => `<span class="ln${i === cur ? " cur" : ""}">${l || " "}</span>`).join("");
  const nums = lines.map((_, i) => `<span${i === cur ? ' class="cur"' : ""}>${i === cur ? i + 1 : Math.abs(i - cur)}</span>`).join("");
  return `
    <div class="tw nvim">
      <div class="tw-bar"><span>nvim ~/.config/nvim/lua/plugins/feline-nvim.lua</span></div>
      <div class="nv-tabline"><span>gruvbox.lua</span><span class="on">feline-nvim.lua</span><span>community.lua</span></div>
      <div class="nv-main">
        <div class="nv-tree">
          <div class="nv-tree-head">~/.config/nvim</div>
          <div class="d">▾ lua</div>
          <div class="d i1">▾ plugins</div>
          <div class="f i2">astrocore.lua</div>
          <div class="f i2 mod">feline-nvim.lua</div>
          <div class="f i2">gruvbox.lua</div>
          <div class="f i2">mason.lua</div>
          <div class="f i1">community.lua</div>
          <div class="f i1">polish.lua</div>
          <div class="f">init.lua</div>
          <div class="f">lazy-lock.json</div>
        </div>
        <div class="nv-code"><div class="gutter" aria-hidden="true">${nums}</div><pre>${code}</pre></div>
      </div>
      <div class="nv-status">
        <span class="fl-bar">▊</span><span class="fl-mode">NORMAL</span>
        <span class="fl-slant-l"></span><span class="fl-file">feline-nvim.lua</span><span class="fl-slant-r"></span>
        <span class="fl-plain">742b</span><span class="fl-plain">13:5</span>
        <span class="fl-gap"></span>
        <span class="fl-git">⎇ main</span><span class="fl-add">+2</span><span class="fl-chg">~1</span>
        <span class="fl-plain fl-bold">54%</span><span class="fl-scroll">▅▅</span>
      </div>
      <div class="nv-cmd">"feline-nvim.lua" 21L, 742B written</div>
    </div>`;
}

function waybarBar() {
  const { d } = clock();
  const h12 = d.getHours() % 12 || 12;
  const ampm = d.getHours() < 12 ? "AM" : "PM";
  const date = d.toLocaleDateString("en-AU", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).replace(/,/g, "");
  return `
    <div class="wb">
      <div class="wb-grp"><span class="wb-clock" data-wb-clock>${pad2(h12)}:${pad2(d.getMinutes())} ${ampm} - ${esc(date)}</span></div>
      <div class="wb-grp wb-ws"><span class="ws active">1</span><span class="ws visible">2</span><span class="ws">3</span><span class="ws empty">4</span><span class="ws last">5</span></div>
      <div class="wb-grp">
        <span class="wb-mod wb-tray" aria-label="tray"><i></i><i></i><i></i></span>
        <span class="wb-mod wb-gold">12%</span><span class="wb-mod wb-gold">38%</span>
        <span class="wb-mod wb-bat">bat 84%</span>
        <span class="wb-mod wb-gold">wifi 1.2Mb/s</span>
        <span class="wb-mod wb-gold">vol 60%</span>
      </div>
    </div>`;
}

function waybarMock() {
  return `
    <div class="wb-stage">
      <div class="wb-scroll">${waybarBar()}</div>
    </div>
    <div class="wb-states">
      <p class="wb-states-title">Module states</p>
      <div class="wb-state"><span class="ws">3</span><span>workspace</span></div>
      <div class="wb-state"><span class="ws active">1</span><span>active</span></div>
      <div class="wb-state"><span class="ws visible">2</span><span>visible</span></div>
      <div class="wb-state"><span class="ws empty">4</span><span>empty</span></div>
      <div class="wb-state"><span class="ws urgent">6</span><span>urgent</span></div>
      <div class="wb-state"><span class="ws last">5</span><span>last</span></div>
      <div class="wb-state"><span class="wb-mod wb-crit">97%</span><span>cpu critical</span></div>
      <div class="wb-state"><span class="wb-mod wb-crit">bat 9%</span><span>battery low</span></div>
    </div>`;
}

function hyprlandMock() {
  return `
    <div class="desk-stage hl">
      <div class="hl-bar">${waybarBar()}</div>
      <div class="hl-tiles">
        <div class="win active">
          <div class="win-in term-body"><span class="p-ok">gaddo@akame</span> <span class="p-dir">~</span> <span class="p-ch">❯</span> hyprctl activewindow -j | jq .class
<span class="a-green">"kitty"</span>
<span class="p-ok">gaddo@akame</span> <span class="p-dir">~</span> <span class="p-ch">❯</span> grep border ~/.config/hypr/hyprland.lua
        border_size = 1,
            active_border = { colors = { <span class="a-green">"rgba(db814cee)"</span>, <span class="a-green">"rgba(ecd08fee)"</span> }, angle = 45 },
            inactive_border = <span class="a-green">"rgba(7d7860aa)"</span>,
<span class="p-ok">gaddo@akame</span> <span class="p-dir">~</span> <span class="p-ch">❯</span> <span class="term-cur"></span>
          </div>
        </div>
        <div class="win">
          <div class="win-in hl-code"><span class="t-c">-- LOOK AND FEEL</span>
<span class="t-f">hl.config</span>({
    general = {
        gaps_in = <span class="t-n">1</span>,
        gaps_out = <span class="t-n">4</span>,
        border_size = <span class="t-n">1</span>,
    },
    decoration = {
        rounding = <span class="t-n">2</span>,
    },
})
          </div>
        </div>
        <div class="win">
          <div class="win-in hl-files">
            <div class="hl-files-head">~/.config/hypr</div>
            <div>colors.conf</div><div>gruv-01.jpg</div><div>hypridle.conf</div><div class="on">hyprland.lua</div><div>hyprlock.conf</div><div>hyprpaper.conf</div>
          </div>
        </div>
      </div>
    </div>`;
}

function hyprlockMock() {
  const { h, m, s, d } = clock();
  const date = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "2-digit" });
  return `
    <div class="desk-stage hk" aria-label="Hyprlock lock screen">
      <div class="hk-bg" aria-hidden="true"></div>
      <div class="hk-time" data-hk-time>${pad2(h)}:${pad2(m)}:${pad2(s)}</div>
      <div class="hk-date">${esc(date)}</div>
      <div class="hk-layout">English (US)</div>
      <div class="hk-field"><span>Password</span></div>
    </div>`;
}

function rofiMock() {
  const items = [["Code", "sel"], ["Codium", ""], ["Color Picker", ""], ["Console", "act"], ["Discord", "urg"], ["Decoder", ""], ["Pavucontrol", ""], ["Network Connections", ""]];
  return `
    <div class="desk-stage rf">
      <div class="rofi rofi-lg">
        <div class="rofi-img rofi-panel" role="img" aria-label="The vending machines from the wallpaper"></div>
        <div class="rofi-lb">
          <div class="rofi-inp"><span class="pr">❯</span><span class="ph">co</span></div>
          <div class="rofi-list">${items.map(([n, c]) => `<div class="el ${c}"><i></i>${n}</div>`).join("")}</div>
          <div class="rofi-modes"><span class="on">apps</span><span>run</span><span>files</span><span>windows</span></div>
        </div>
      </div>
    </div>`;
}

function bashMock() {
  const v = TS.VARIANTS[TS.current];
  const name = SHELL_NAME[TS.current];
  const rows = TS.ACCENTS.map((n) => `<span style="color:var(--${n})">███ ${n.padEnd(6)}</span> ${v.colors[n]}`).join("\n");
  const pr = '<span class="p-ok">gaddo@akame</span> <span class="p-dir">~</span> <span class="p-ch">$</span>';
  return `
    <div class="tw">
      <div class="tw-bar"><span>gaddo@akame: ~</span></div>
      <pre class="term-body tw-body">${pr} export TOKYO_SNOW_VARIANT=${name}
${pr} source ~/.config/tokyo-snow.theme
${pr} for n in "\${theme_swatch[@]}"; do v=c_$n; printf '%s███ %-6s%s %s\\n' "\${!v}" "$n" "$c_reset" "\${theme_hex[$n]}"; done
${rows}
${pr} printf '%sHello%s\\n' "$c_amber" "$c_reset"
<span style="color:var(--amber)">Hello</span>
${pr} <span class="term-cur"></span></pre>
    </div>`;
}

function ompPrompt(path, cmd, time, ms) {
  return `
    <div class="omp-line">
      <div class="omp-left">
        <span class="pl s-ember">●</span><span class="pl s-gold">gaddo</span><span class="pl s-snow">${path}</span><span class="pl s-moss">[⎇ main] ≡</span>
      </div>
      <div class="omp-right"><span class="pl-r">◷ ${ms}s</span><span class="pl-r">${time} <i>|</i> Sunday<i> | </i><b>⬢</b> <em>22.15.0</em></span></div>
    </div>
    <div class="omp-cmd"><span class="omp-pr">&gt;&gt;</span> ${cmd}</div>`;
}

function ompMock() {
  return `
    <div class="tw">
      <div class="tw-bar"><span>gaddo@akame: ~/source/tokyo-snow</span></div>
      <div class="tw-body omp">
        ${ompPrompt("~/s/tokyo-snow", "git status --short", "22:41:03", "0.218")}
<pre class="omp-out"> <span class="a-yellow">M</span> port.css
<span class="a-green">??</span> ports/</pre>
        ${ompPrompt("~/s/tokyo-snow", '<span class="term-cur"></span>', "22:41:07", "0.012")}
      </div>
    </div>`;
}

const MOCKS = { neovim: nvimMock, waybar: waybarMock, hyprland: hyprlandMock, hyprlock: hyprlockMock, rofi: rofiMock, bash: bashMock, omp: ompMock };

/* ---------- page ---------- */

function chip(color) {
  if (color === "photo") return '<span class="chip chip-photo" aria-hidden="true"></span>';
  if (color === "all" || color === "accents") {
    const names = color === "all" ? [...TS.ACCENTS, ...TS.BASE] : TS.ACCENTS;
    return `<span class="chip chip-strip" aria-hidden="true">${names.map((n) => `<i style="background:var(--${n})"></i>`).join("")}</span>`;
  }
  if (color === "none") return '<span class="chip chip-none" aria-hidden="true"></span>';
  if (color.includes(">")) {
    const [a, b] = color.split(">");
    return `<span class="chip" style="background:linear-gradient(45deg,var(--${a}),var(--${b}))" aria-hidden="true"></span>`;
  }
  return `<span class="chip" style="background:var(--${color})" aria-hidden="true"></span>`;
}
const colorLabel = (c) => ({ photo: "photo", all: "all 13", accents: "accents", none: "—" })[c] || c.replace(">", " → ");

function codeblock(code) {
  return `<div class="codeblock"><pre><code>${esc(code)}</code></pre><button type="button" class="copy" data-copy="${esc(code)}">Copy</button></div>`;
}

function variantNote(p) {
  if (p.allVariants) return "The extension ships all three. Switch to see each one.";
  if (p.shellVariants) return "All four variants are built in. Tokyo Snow is lamplit-glow.";
  return "This config ships Tokyo Snow. The other variants are a preview.";
}

function primaryLink(p) {
  return p.details.links.find((l) => /Marketplace|Open VSX/.test(l.label)) || { label: "View source", href: p.details.source.href };
}

function render(p) {
  const d = p.details;
  const cta = primaryLink(p);
  const others = TS.PORTS.filter((o) => o !== p);
  const methods = p.install.map((m) => `
    <div class="method">
      <h3>${esc(m.title)}</h3>
      ${m.steps ? (m.steps.length > 1 ? `<ol class="steps">${m.steps.map((s) => `<li>${s}</li>`).join("")}</ol>` : `<p>${m.steps[0]}</p>`) : ""}
      ${m.code ? codeblock(m.code) : ""}
    </div>`).join("");
  const rows = p.mapping.map(([what, color, note]) => `
    <tr>
      <td class="map-c">${chip(color)}<code>${esc(colorLabel(color))}</code></td>
      <td>${esc(what)}</td>
      <td class="map-note">${note ? esc(note) : ""}</td>
    </tr>`).join("");

  $("[data-port-page]").innerHTML = `
    <section class="port-hero" style="--hue: var(--${p.hue})">
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="${root}index.html#ports">Ports</a><span>/</span><span>${KIND[p.kind]}</span><span>/</span><span aria-current="page">${esc(p.name)}</span></nav>
        <div class="ph">
          <div class="ph-tile" aria-hidden="true"><span>${esc(p.mark)}</span></div>
          <div class="ph-text">
            <h1>${esc(p.name)}</h1>
            <p class="ph-sub">Tokyo Snow for ${esc(p.name)}</p>
            <p class="ph-intro">${esc(p.intro)}</p>
            <div class="cta">
              <a class="btn btn-primary" href="${cta.href}">${esc(cta.label === "View source" ? "View source" : `Get it on ${cta.label.replace("Visual Studio ", "the ")}`)}</a>
              <a class="btn" href="#install">Install steps</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="port-preview" aria-label="Preview">
      <div class="wrap">
        <div class="preview-bar">
          <div class="seg" role="group" aria-label="Variant" data-variant-seg></div>
          <p class="hint">${esc(variantNote(p))}</p>
        </div>
        <div class="stage" data-stage></div>
        <p class="stage-cap">A live mock drawn from the config's own colour values${p.preview === "editor" ? "" : ", not a screenshot"}.</p>
      </div>
    </section>

    <div class="wrap port-main">
      <article class="port-article">
        <section id="install" aria-labelledby="install-title">
          <h2 id="install-title">Install</h2>
          ${methods}
          ${p.activate ? `<div class="method"><h3>${p.allVariants ? "Activate the theme" : "Before you start"}</h3><p>${p.activate}</p></div>` : ""}
        </section>
        <section aria-labelledby="map-title">
          <h2 id="map-title">${esc(p.mappingTitle)}</h2>
          <div class="map-wrap"><table class="map"><thead><tr><th>Colour</th><th>Used for</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table></div>
        </section>
      </article>

      <aside class="details" aria-label="Details">
        <div class="det-card">
          <h2>Details</h2>
          <dl>
            <dt>Source</dt><dd><a href="${d.source.href}">${esc(d.source.label)}</a></dd>
            <dt>Files</dt><dd><ul class="det-files">${d.files.map((f) => `<li><a href="${f.href}"><code>${esc(f.path)}</code></a></li>`).join("")}</ul></dd>
            <dt>Variants</dt><dd>${esc(d.variants)}</dd>
            <dt>Requires</dt><dd>${esc(d.requires)}</dd>
            ${d.links.length ? `<dt>Links</dt><dd><ul class="det-links">${d.links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("")}</ul></dd>` : ""}
          </dl>
        </div>
      </aside>
    </div>

    <section class="section more" aria-labelledby="more-title">
      <div class="wrap">
        <div class="section-head"><p class="eyebrow">More ports</p><h2 id="more-title">The rest of the alley</h2></div>
        <ul class="ports ports-4">${others.map(TS.portCard).join("")}</ul>
      </div>
    </section>`;

  const stage = $("[data-stage]");
  stage.classList.add(`stage-${p.preview}`);
  if (p.preview === "editor") TS.mountEditor(stage, { title: p.previewTitle });
  else stage.innerHTML = MOCKS[p.preview]();
}

/* ---------- boot ---------- */

if (!port) {
  $("[data-port-page]").innerHTML = `<div class="wrap" style="padding-block:120px"><h1>Port not found</h1><p><a href="${root}index.html#ports">See all ports</a></p></div>`;
  TS.start();
  return;
}

render(port);
if (port.preview === "bash") TS.onVariant(() => { $("[data-stage]").innerHTML = bashMock(); });
if (["hyprlock", "waybar", "hyprland"].includes(port.preview)) {
  setInterval(() => {
    const { h, m, s, d } = clock();
    const t = $("[data-hk-time]");
    if (t) t.textContent = `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
    const c = $("[data-wb-clock]");
    if (c && s === 0) c.outerHTML = waybarBar().match(/<span class="wb-clock"[^]*?<\/span>/)[0];
  }, 1000);
}
TS.start();
})();
