// The VS Code window mock. TS.mountEditor(el, { title }) fills el with the window and wires its tabs.
(() => {
const TS = window.TS;
const { $, $$, esc } = TS;

// Samples are written «class:text». Brackets inside «pu:…» are coloured by nesting depth,
// the way VS Code's bracket pair colouring does, and hex colours in «n:…» get a colour decorator.
const FILES = {
  js: { name: "demo.js", lang: "JavaScript", icon: "JS", cursor: 14, src: `
«c:// Vending-machine light on a snowy alley at night»
«ki:import» «v:axios» «ki:from» «s:'axios'»«pu:;»
«ki:import» «pu:{» «v:useState» «pu:}» «ki:from» «s:'react'»«pu:;»

«k:const» «n:API_URL» «o:=» «s:'https://api.example.com/data'»«pu:;»
«k:const» «n:MAX_RETRIES» «o:=» «n:3»«pu:;»

«k:class» «t:DataProcessor» «pu:{»
  «k:constructor»«pu:(»«pa:config»«pu:)» «pu:{»
    «th:this»«pu:.»«p:apiUrl» «o:=» «n:API_URL»«pu:;»
    «th:this»«pu:.»«p:isActive» «o:=» «n:true»«pu:;»
  «pu:}»

  «k:async» «f:fetchData»«pu:(»«pa:endpoint»«pu:,» «pa:options» «o:=» «pu:{}»«pu:)» «pu:{»
    «k:const» «v:res» «o:=» «k:await» «v:axios»«pu:.»«f:get»«pu:(»«s:\`»«te:\${»«th:this»«pu:.»«p:apiUrl»«te:}»«s:/»«te:\${»«v:endpoint»«te:}»«s:\`»«pu:)»«pu:;»
    «k:return» «v:res»«pu:.»«p:data»«o:?.»«f:filter»«pu:(»«pa:item» «k:=>» «v:item»«pu:.»«p:score» «o:>» «n:0.8»«pu:)»«pu:;»
  «pu:}»
«pu:}»

«k:const» «n:EMAIL_REGEX» «o:=» «re:/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/»«pu:;»

«ki:export» «ki:default» «t:DataProcessor»«pu:;»` },
  rs: { name: "drift.rs", lang: "Rust", icon: "RS", cursor: 12, src: `
«c:/// Snow that has settled in an alley overnight.»
«k:use» «t:std»«pu:::»«t:collections»«pu:::»«t:HashMap»«pu:;»

«m:#[derive(Debug, Clone)]»
«k:pub» «k:struct» «t:Drift»«pu:<»«lt:'a»«pu:>» «pu:{»
    «k:pub» «p:street»«pu::» «o:&»«lt:'a» «t:str»«pu:,»
    «k:pub» «p:depth_cm»«pu::» «t:f32»«pu:,»
«pu:}»

«k:impl»«pu:<»«lt:'a»«pu:>» «t:Drift»«pu:<»«lt:'a»«pu:>» «pu:{»
    «k:pub» «k:fn» «f:is_walkable»«pu:(»«o:&»«th:self»«pu:)» «o:->» «t:bool» «pu:{»
        «th:self»«pu:.»«p:depth_cm» «o:<» «n:12.5»
    «pu:}»
«pu:}»

«k:fn» «f:main»«pu:(»«pu:)» «pu:{»
    «k:let» «k:mut» «v:alleys» «o:=» «t:HashMap»«pu:::»«f:new»«pu:(»«pu:)»«pu:;»
    «v:alleys»«pu:.»«f:insert»«pu:(»«s:"Shinjuku"»«pu:,» «n:8.0»«pu:)»«pu:;»

    «k:for» «pu:(»«v:street»«pu:,» «v:depth»«pu:)» «k:in» «o:&»«v:alleys» «pu:{»
        «m:println!»«pu:(»«s:"»«te:{street}»«s:: »«te:{depth:.1}»«s: cm"»«pu:)»«pu:;»
    «pu:}»
«pu:}»` },
  css: { name: "alley.css", lang: "CSS", icon: "#", cursor: 13, src: `
«c:/* The alley, after midnight */»
«t::root» «pu:{»
  «p:--wall»«pu::» «n:#2a2a28»«pu:;»
  «p:--sign»«pu::» «n:#d5583d»«pu:;»
  «p:--shelf»«pu::» «n:#e1b568»«pu:;»
«pu:}»

«t:.vending-machine» «pu:{»
  «p:display»«pu::» «n:grid»«pu:;»
  «p:grid-template-columns»«pu::» «f:repeat»«pu:(»«n:4»«pu:,» «n:1fr»«pu:)»«pu:;»
  «p:background»«pu::» «f:var»«pu:(»«v:--wall»«pu:)»«pu:;»
  «p:box-shadow»«pu::» «n:0» «n:0» «n:32px» «f:rgb»«pu:(»«n:225» «n:181» «n:104» «o:/» «n:40%»«pu:)»«pu:;»
«pu:}»

«t:.vending-machine» «t:.button»«ps::hover» «pu:{»
  «p:color»«pu::» «f:var»«pu:(»«v:--sign»«pu:)»«pu:;»
  «p:transition»«pu::» «p:color» «n:120ms» «n:ease-out»«pu:;»
«pu:}»

«k:@media» «pu:(»«p:prefers-reduced-motion»«pu::» «n:reduce»«pu:)» «pu:{»
  «t:*» «pu:{» «p:transition»«pu::» «n:none» «k:!important»«pu:;» «pu:}»
«pu:}»` },
  md: { name: "notes.md", lang: "Markdown", icon: "M↓", cursor: 5, src: `
«mhp:#» «mh:Tokyo Snow»

A warm, dark theme sampled from «mb:one photo» of a snowy alley.

«mhp:##» «mh:Where the colours come from»

«ml:-» The «mi:lit machines and signs»: brick, neon, ember, amber, gold
«ml:-» The «mi:snow under green light»: sage, moss, pine
«ml:-» The «mi:shadowed walls»: night, shadow, slate, dim, snow

«mq:> Every colour in the theme is one of the 13.»

«mhp:##» «mh:Install»

«mc:\`code --install-extension MatthewGadsden.tokyo-snow-vs\`»

See «mlt:[the releases]»«mu:(https://github.com/MatthewGadsden/tokyo-snow-vs/releases)» for a «mc:\`.vsix\`».` },
};

function highlight(src) {
  let depth = 0;
  const cls = (d) => `b${((d - 1) % 6 + 1) % 6}`;
  const bracket = (ch) => {
    if ("([{".includes(ch)) return `<span class="${cls(++depth)}">${ch}</span>`;
    if (")]}".includes(ch)) {
      const out = `<span class="${cls(Math.max(depth, 1))}">${ch}</span>`;
      depth = Math.max(0, depth - 1);
      return out;
    }
    return esc(ch);
  };
  let html = "";
  let last = 0;
  for (const m of src.matchAll(/«(\w+):([^»]*)»/g)) {
    html += esc(src.slice(last, m.index));
    const [, kind, text] = m;
    if (kind === "pu") html += `<span class="t-pu">${[...text].map(bracket).join("")}</span>`;
    else if (kind === "n" && /^#[0-9a-f]{6}$/i.test(text)) html += `<i class="cdeco" style="background:${text}"></i><span class="t-n">${text}</span>`;
    else html += `<span class="t-${kind}">${esc(text)}</span>`;
    last = m.index + m[0].length;
  }
  return html + esc(src.slice(last));
}

const ICONS = {
  files: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M8 13h8M8 17h6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5.5 5.5"/>',
  git: '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 8.2v7.6M18 11.2c0 3-5 2.8-10.8 5.4"/>',
  run: '<path d="M7 5v14l11-7L7 5Z"/>',
  ext: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
};
TS.highlight = highlight;

const svg = (k) => `<svg viewBox="0 0 24 24">${ICONS[k]}</svg>`;
const fileIcon = (k) => `<i class="fi fi-${k}">${FILES[k].icon}</i>`;

TS.mountEditor = (el, { title = "Visual Studio Code" } = {}) => {
  const keys = Object.keys(FILES);
  el.innerHTML = `
    <div class="vsc" aria-label="${esc(title)} window using the Tokyo Snow theme">
      <div class="vsc-title">
        <span class="vsc-menu">File&nbsp;&nbsp;Edit&nbsp;&nbsp;Selection&nbsp;&nbsp;View&nbsp;&nbsp;Go&nbsp;&nbsp;Run&nbsp;&nbsp;Terminal&nbsp;&nbsp;Help</span>
        <span class="vsc-wintitle"><span data-file-name></span> — snowy-alley — ${esc(title)}</span>
        <span class="vsc-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
      <div class="vsc-body">
        <div class="vsc-act" aria-hidden="true">
          <span class="on">${svg("files")}</span><span>${svg("search")}</span><span>${svg("git")}<b>3</b></span><span>${svg("run")}</span><span>${svg("ext")}</span>
        </div>
        <div class="vsc-side">
          <div class="vsc-side-title">Explorer</div>
          <div class="vsc-section">▾ snowy-alley</div>
          <ul class="vsc-tree" data-tree>
            <li class="dir">› .vscode</li>
            <li class="dir">› assets</li>
            <li><button type="button" data-file="js">${fileIcon("js")}demo.js</button></li>
            <li><button type="button" data-file="rs">${fileIcon("rs")}drift.rs</button></li>
            <li><button type="button" data-file="css" class="git-m">${fileIcon("css")}alley.css<em>M</em></button></li>
            <li><button type="button" data-file="md" class="git-a">${fileIcon("md")}notes.md<em>U</em></button></li>
            <li class="git-i"><i class="fi">·</i>.env</li>
            <li><i class="fi">{}</i>package.json</li>
          </ul>
        </div>
        <div class="vsc-editor">
          <div class="vsc-tabs" role="tablist" aria-label="Open files" data-tabs>
            ${keys.map((k) => `<button type="button" role="tab" data-file="${k}">${fileIcon(k)}${FILES[k].name}</button>`).join("")}
          </div>
          <div class="vsc-crumbs">snowy-alley › <span data-file-name></span></div>
          <div class="vsc-code" tabindex="0" aria-label="Code sample"><div class="gutter" aria-hidden="true" data-gutter></div><pre data-code></pre></div>
        </div>
      </div>
      <div class="vsc-panel">
        <div class="vsc-panel-tabs"><span>Problems</span><span>Output</span><span class="on">Terminal</span></div>
        <pre class="term"><span class="a-green">gaddo</span> <span class="a-blue">~/src/snowy-alley</span> <span class="a-yellow">main</span> <span class="a-red">❯</span> ${title === "VSCodium" ? "codium" : "code"} --install-extension MatthewGadsden.tokyo-snow-vs
Installing extensions...
<span class="a-green">Extension 'matthewgadsden.tokyo-snow-vs' v1.1.0 was successfully installed.</span>
<span class="a-green">gaddo</span> <span class="a-blue">~/src/snowy-alley</span> <span class="a-yellow">main</span> <span class="a-red">❯</span> <span class="term-cur"></span></pre>
      </div>
      <div class="vsc-status">
        <span class="st-remote">⇄</span>
        <span>⎇ main*</span>
        <span>⊗ 0  ⚠ 1</span>
        <span class="st-push"></span>
        <span class="st-hide">Ln 12, Col 34</span>
        <span class="st-hide">UTF-8</span>
        <span data-lang></span>
        <span class="st-theme" data-theme-name>Tokyo Snow</span>
      </div>
    </div>`;

  const show = (key) => {
    const file = FILES[key];
    const lines = highlight(file.src.replace(/^\n+/, "")).split("\n");
    const cur = Math.min(file.cursor, lines.length) - 1;
    $("[data-code]", el).innerHTML = lines
      .map((l, i) => `<span class="ln${i === cur ? " cur" : ""}">${l}${i === cur ? '<span class="caret"></span>' : ""}</span>`)
      .join("");
    $("[data-gutter]", el).innerHTML = lines.map((_, i) => `<span${i === cur ? ' class="cur"' : ""}>${i + 1}</span>`).join("");
    $$("[data-file-name]", el).forEach((n) => { n.textContent = file.name; });
    $("[data-lang]", el).textContent = file.lang;
    $$("[data-tabs] [data-file]", el).forEach((b) => {
      const on = b.dataset.file === key;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $$("[data-tree] [data-file]", el).forEach((b) => b.setAttribute("aria-current", String(b.dataset.file === key)));
    $(".vsc-code", el).scrollTop = 0;
  };

  el.addEventListener("click", (e) => {
    const b = e.target.closest("[data-file]");
    if (b) show(b.dataset.file);
  });
  const tabs = $$("[data-tabs] [data-file]", el);
  $("[data-tabs]", el).addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    show(next.dataset.file);
  });
  show("js");
};
})();
