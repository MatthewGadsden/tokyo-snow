// Shared site data: the palette, its variants, and every port with the content for its page.
// Plain script (no modules) so the site also works when opened straight from disk.
window.TS = window.TS || {};

(() => {
const TS = window.TS;

TS.VARIANTS = {
  "tokyo-snow": {
    label: "Tokyo Snow", short: "Tokyo Snow", tag: "default",
    about: "The photo's brightest lamplit tones, with clear greens.",
    colors: { brick: "#96402e", neon: "#d5583d", ember: "#db814c", amber: "#e1b568", gold: "#ecd08f", sage: "#c4c88e", moss: "#a6d46c", pine: "#6fc28a", night: "#1c1c1a", shadow: "#2a2a28", slate: "#3a3933", dim: "#7d7860", snow: "#f1e4b5" },
  },
  "neon-alley": {
    label: "Tokyo Snow Neon Alley", short: "Neon Alley", tag: "bold",
    about: "Reds and oranges pushed toward the glow of the signs, with slightly darker backgrounds.",
    colors: { brick: "#a8341f", neon: "#e8492b", ember: "#f07f3c", amber: "#f2aa4c", gold: "#f4cc72", sage: "#c9d48a", moss: "#a9c46f", pine: "#7fae6a", night: "#1a1a17", shadow: "#282823", slate: "#3a382f", dim: "#807a5c", snow: "#f3e6b6" },
  },
  "vending-glow": {
    label: "Tokyo Snow Vending Glow", short: "Vending Glow", tag: "loudest",
    about: "Near-full saturation and the deepest backgrounds.",
    colors: { brick: "#b8321c", neon: "#ff4b2b", ember: "#ff8a3d", amber: "#ffb547", gold: "#ffd56b", sage: "#d0e08a", moss: "#a6d46c", pine: "#6fc28a", night: "#161613", shadow: "#24241f", slate: "#36342b", dim: "#868063", snow: "#fff0c2" },
  },
};

TS.ACCENTS = ["brick", "neon", "ember", "amber", "gold", "sage", "moss", "pine"];
TS.BASE = ["night", "shadow", "slate", "dim", "snow"];

TS.ROLES = {
  brick:  { photo: "Deep red in the machines' shadows", editor: "Reserved; not used in the editor" },
  neon:   { photo: "The red KIRIN sign", editor: "Keywords, tags, this/self, errors" },
  ember:  { photo: "Burnt-orange machine glow", editor: "Numbers, constants, escapes, decorators" },
  amber:  { photo: "Lit drink shelves", editor: "Types and classes, cursor, accent, warnings" },
  gold:   { photo: "The BOSS sign and lit panels", editor: "Body text, variables, operators" },
  sage:   { photo: "Snow under the green-tinted light", editor: "Properties and keys, regular expressions" },
  moss:   { photo: "Mid green tint", editor: "Strings, added lines" },
  pine:   { photo: "Cold green-teal cast on the snow", editor: "Functions and methods, links, info" },
  night:  { photo: "Deepest shadow", editor: "Sidebar, panels, title and status bars" },
  shadow: { photo: "The alley's dark walls", editor: "Editor background" },
  slate:  { photo: "Lit edges of the shadows", editor: "Borders, current line, list selection" },
  dim:    { photo: "Shadowed pavement", editor: "Comments, line numbers, muted text" },
  snow:   { photo: "The brightest snow", editor: "Emphasised text, active tabs" },
};

const GH = "https://github.com/MatthewGadsden";
const EXT = `${GH}/tokyo-snow-vs`;
const ARCH = `${GH}/gaddo-arch`;
const CONF = `${GH}/mgadsden-configs`;
const archFile = (p) => ({ path: p, href: `${ARCH}/blob/main/${p}` });
const confFile = (p) => ({ path: p, href: `${CONF}/blob/main/${p}` });
const extFile = (p) => ({ path: p, href: `${EXT}/blob/main/${p}` });

const EDITOR_MAPPING = [...TS.ACCENTS, ...TS.BASE].map((n) => [TS.ROLES[n].editor, n]);
const EXT_VARIANTS = "Tokyo Snow, Neon Alley and Vending Glow, as three separate themes.";
const DEFAULT_ONLY = "The config ships the default Tokyo Snow palette. To use another variant, swap in its hex values from the palette table.";
const SHELL_VARIANTS = "All four, picked with TOKYO_SNOW_VARIANT: lamplit-glow (the same palette as Tokyo Snow), lamplit, neon-alley and vending-glow.";

// mapping rows are [what, colour] or [what, colour, note]; a colour can be "a>b" for a gradient
TS.PORTS = [
  {
    slug: "visual-studio-code", name: "Visual Studio Code", kind: "editor", mark: "{ }", hue: "amber",
    where: "Marketplace", desc: "The extension. Ships Tokyo Snow, Neon Alley and Vending Glow.",
    intro: "A colour theme extension with three variants. Syntax, semantic highlighting, bracket pair colours, git decorations and the integrated terminal all draw from the same 13 colours.",
    preview: "editor", previewTitle: "Visual Studio Code",
    allVariants: true,
    install: [
      { title: "Install from the Marketplace", steps: [
        "Open the Extensions view with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd> on Mac).",
        "Search for <b>Tokyo Snow</b> by MatthewGadsden and click <b>Install</b>.",
      ] },
      { title: "Install from the command line", code: "code --install-extension MatthewGadsden.tokyo-snow-vs" },
      { title: "Install from a release", steps: [
        `Download the <code>.vsix</code> from the latest <a href="${EXT}/releases">GitHub release</a>, then install it:`,
      ], code: "code --install-extension tokyo-snow-vs-1.1.0.vsix" },
    ],
    activate: "Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Mac), run <b>Preferences: Color Theme</b>, and choose Tokyo Snow, Tokyo Snow Neon Alley or Tokyo Snow Vending Glow.",
    mappingTitle: "What each colour does in the editor",
    mapping: EDITOR_MAPPING,
    details: {
      source: { label: "tokyo-snow-vs", href: EXT },
      links: [
        { label: "Visual Studio Marketplace", href: "https://marketplace.visualstudio.com/items?itemName=MatthewGadsden.tokyo-snow-vs" },
        { label: "Releases", href: `${EXT}/releases` },
        { label: "Report an issue", href: `${EXT}/issues` },
      ],
      files: [extFile("themes/tokyo-snow-color-theme.json"), extFile("themes/tokyo-snow-neon-alley-color-theme.json"), extFile("themes/tokyo-snow-vending-glow-color-theme.json"), extFile("tokyo-snow-demo.js")],
      variants: EXT_VARIANTS,
      requires: "VS Code 1.74 or newer.",
    },
  },
  {
    slug: "vscodium", name: "VSCodium & Code - OSS", kind: "editor", mark: "vsx", hue: "ember",
    where: "Open VSX", desc: "The same extension, published on Open VSX.",
    intro: "The VS Code extension, published on Open VSX, the registry VSCodium uses by default. It's the same build, with the same three variants.",
    preview: "editor", previewTitle: "VSCodium",
    allVariants: true,
    install: [
      { title: "Install from Open VSX", steps: [
        "Open the Extensions view with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>.",
        "Search for <b>Tokyo Snow</b> by MatthewGadsden and click <b>Install</b>.",
      ] },
      { title: "Install from the command line", code: "codium --install-extension MatthewGadsden.tokyo-snow-vs" },
      { title: "Install from a release", steps: [
        `Download the <code>.vsix</code> from the latest <a href="${EXT}/releases">GitHub release</a>, then install it:`,
      ], code: "codium --install-extension tokyo-snow-vs-1.1.0.vsix" },
    ],
    activate: "Open the Command Palette with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, run <b>Preferences: Color Theme</b>, and choose Tokyo Snow, Tokyo Snow Neon Alley or Tokyo Snow Vending Glow.",
    mappingTitle: "What each colour does in the editor",
    mapping: EDITOR_MAPPING,
    details: {
      source: { label: "tokyo-snow-vs", href: EXT },
      links: [
        { label: "Open VSX", href: "https://open-vsx.org/extension/MatthewGadsden/tokyo-snow-vs" },
        { label: "Releases", href: `${EXT}/releases` },
        { label: "Report an issue", href: `${EXT}/issues` },
      ],
      files: [extFile("themes/tokyo-snow-color-theme.json"), extFile("themes/tokyo-snow-neon-alley-color-theme.json"), extFile("themes/tokyo-snow-vending-glow-color-theme.json")],
      variants: EXT_VARIANTS,
      requires: "A VSCodium or Code - OSS build that installs from Open VSX.",
    },
  },
  {
    slug: "neovim", name: "Neovim", kind: "editor", mark: ":wq", hue: "pine",
    where: "gaddo-arch", desc: "Colour overrides and statusline in the Neovim config.",
    intro: "gruvbox-flat.nvim with every colour replaced by the Tokyo Snow palette, plus a feline.nvim statusline to match. Both are lazy.nvim plugin specs from an AstroNvim v5 config.",
    preview: "neovim",
    install: [
      { title: "Copy the plugin specs", steps: [
        "Both files are lazy.nvim plugin specs, so they work in any lazy.nvim setup, AstroNvim included.",
      ], code: "git clone https://github.com/MatthewGadsden/gaddo-arch\ncp gaddo-arch/nvim/lua/plugins/gruvbox.lua \\\n   gaddo-arch/nvim/lua/plugins/feline-nvim.lua ~/.config/nvim/lua/plugins/" },
      { title: "Restart Neovim", steps: [
        "lazy.nvim installs gruvbox-flat.nvim and feline.nvim on the next start. The spec runs <code>colorscheme gruvbox-flat</code> once the plugin loads.",
      ] },
    ],
    mappingTitle: "gruvbox-flat colours, recoloured",
    mapping: [
      ["Editor background (bg)", "shadow"],
      ["Sidebars, popups, floats, statusline", "night"],
      ["Visual selection, cursor line, search", "slate"],
      ["Text (fg)", "gold"],
      ["Bright text (fg_light)", "snow"],
      ["Comments, gutter, borders", "dim"],
      ["red, errors", "neon"],
      ["orange", "ember"],
      ["yellow, purple, warnings", "amber"],
      ["aqua, hints", "sage"],
      ["green, tree text", "moss"],
      ["blue, info", "pine"],
      ["red1, yellow background", "brick"],
    ],
    details: {
      source: { label: "gaddo-arch/nvim", href: `${ARCH}/tree/main/nvim` },
      links: [
        { label: "gruvbox-flat.nvim", href: "https://github.com/eddyekofo94/gruvbox-flat.nvim" },
        { label: "feline.nvim", href: "https://github.com/feline-nvim/feline.nvim" },
      ],
      files: [archFile("nvim/lua/plugins/gruvbox.lua"), archFile("nvim/lua/plugins/feline-nvim.lua")],
      variants: DEFAULT_ONLY,
      requires: "Neovim with lazy.nvim.",
    },
  },
  {
    slug: "hyprland", name: "Hyprland", kind: "desktop", mark: "Hy", hue: "neon",
    where: "gaddo-arch", desc: "Window borders, shadow and the alley wallpaper.",
    intro: "Window borders that run from ember to gold, a dim border on inactive windows, a night-coloured shadow, and the alley photo the palette was sampled from as the wallpaper.",
    preview: "hyprland",
    install: [
      { title: "If you use hyprland.lua", steps: ["Set the border and shadow colours in your <code>hl.config</code> call:"],
        code: "hl.config({\n    general = {\n        border_size = 1,\n        col = {\n            active_border = { colors = { \"rgba(db814cee)\", \"rgba(ecd08fee)\" }, angle = 45 }, -- ember -> gold\n            inactive_border = \"rgba(7d7860aa)\", -- dim\n        },\n    },\n    decoration = {\n        rounding = 2,\n        shadow = { enabled = true, range = 4, color = \"rgba(1c1c1aee)\" }, -- night\n    },\n})" },
      { title: "If you use hyprland.conf", steps: ["The same settings in hyprlang:"],
        code: "general {\n    border_size = 1\n    col.active_border = rgba(db814cee) rgba(ecd08fee) 45deg\n    col.inactive_border = rgba(7d7860aa)\n}\n\ndecoration {\n    rounding = 2\n    shadow {\n        enabled = true\n        range = 4\n        color = rgba(1c1c1aee)\n    }\n}" },
      { title: "Set the wallpaper", steps: [
        `Copy <a href="${ARCH}/blob/main/hypr/gruv-01.jpg">gruv-01.jpg</a> to <code>~/.config/hypr/</code> and point hyprpaper at it in <code>hyprpaper.conf</code>:`,
      ], code: "wallpaper {\n    monitor =\n    path = ~/.config/hypr/gruv-01.jpg\n}" },
    ],
    mappingTitle: "Where the colours go",
    mapping: [
      ["Active window border, 45°", "ember>gold"],
      ["Inactive window border", "dim"],
      ["Window shadow", "night"],
      ["Wallpaper", "photo", "The alley photo, hypr/gruv-01.jpg"],
    ],
    details: {
      source: { label: "gaddo-arch/hypr", href: `${ARCH}/tree/main/hypr` },
      links: [{ label: "Hyprland wiki: variables", href: "https://wiki.hypr.land/Configuring/Variables/" }],
      files: [archFile("hypr/hyprland.lua"), archFile("hypr/hyprpaper.conf"), archFile("hypr/gruv-01.jpg")],
      variants: DEFAULT_ONLY,
      requires: "Hyprland, and hyprpaper for the wallpaper.",
    },
  },
  {
    slug: "hyprlock", name: "Hyprlock", kind: "desktop", mark: "Lk", hue: "sage",
    where: "gaddo-arch", desc: "The lock screen, in the same palette.",
    intro: "A lock screen over the blurred alley photo: a large snow-coloured clock, the date in ember, the keyboard layout in neon, and a password field outlined in gold.",
    preview: "hyprlock",
    install: [
      { title: "Copy the config, colours and wallpaper", steps: [
        "<code>colors.conf</code> maps the palette onto the variable names <code>hyprlock.conf</code> uses, so copy both:",
      ], code: "git clone https://github.com/MatthewGadsden/gaddo-arch\ncp gaddo-arch/hypr/{hyprlock.conf,colors.conf,gruv-01.jpg} ~/.config/hypr/" },
      { title: "Lock the screen", steps: ["The clock and labels use the Inter font, so install it if you don't have it."], code: "hyprlock" },
    ],
    mappingTitle: "Where the colours go",
    mapping: [
      ["Clock ($fg0)", "snow"],
      ["Date ($orange)", "ember"],
      ["Keyboard layout ($darkOrange)", "neon"],
      ["Password field outline ($fg)", "gold"],
      ["Password field fill ($bg)", "night"],
      ["Typed text ($fg)", "gold"],
      ["Placeholder and checking state", "ember"],
      ["Background", "photo", "The alley photo, blurred and dimmed to half brightness"],
    ],
    details: {
      source: { label: "gaddo-arch/hypr", href: `${ARCH}/tree/main/hypr` },
      links: [{ label: "Hyprlock wiki", href: "https://wiki.hypr.land/Hypr-Ecosystem/hyprlock/" }],
      files: [archFile("hypr/hyprlock.conf"), archFile("hypr/colors.conf"), archFile("hypr/gruv-01.jpg")],
      variants: DEFAULT_ONLY,
      requires: "Hyprlock and the Inter font.",
    },
  },
  {
    slug: "waybar", name: "Waybar", kind: "desktop", mark: "Wb", hue: "gold",
    where: "gaddo-arch", desc: "Workspaces, clock and status modules.",
    intro: "A thin bar on night with a slate edge. Workspaces light up amber, sage and ember by state, and the status modules sit on solid gold and moss blocks.",
    preview: "waybar",
    install: [
      { title: "Copy the style and modules", steps: [
        "<code>style.css</code> defines all 13 colours with <code>@define-color</code>, so you can also use <code>@amber</code>, <code>@slate</code> and the rest in a style of your own.",
      ], code: "git clone https://github.com/MatthewGadsden/gaddo-arch\ncp -r gaddo-arch/waybar ~/.config/" },
      { title: "Reload Waybar", steps: ["The bar uses FiraCode Nerd Font Mono for its text and icons."], code: "killall -SIGUSR2 waybar" },
    ],
    mappingTitle: "Where the colours go",
    mapping: [
      ["Bar", "night", "With a 1px slate border"],
      ["Clock", "shadow", "Slate border, snow text"],
      ["Workspace", "shadow", "Gold text, dim border"],
      ["Active workspace", "amber"],
      ["Visible workspace", "sage"],
      ["Empty workspace text", "ember"],
      ["Urgent workspace", "neon"],
      ["CPU, memory, network, volume", "gold", "Night text"],
      ["Battery", "moss"],
      ["Tray", "snow"],
      ["Critical and warning states", "snow", "Brick text"],
    ],
    details: {
      source: { label: "gaddo-arch/waybar", href: `${ARCH}/tree/main/waybar` },
      links: [{ label: "Waybar wiki", href: "https://github.com/Alexays/Waybar/wiki" }],
      files: [archFile("waybar/style.css"), archFile("waybar/config.jsonc")],
      variants: DEFAULT_ONLY,
      requires: "Waybar and FiraCode Nerd Font.",
    },
  },
  {
    slug: "rofi", name: "Rofi", kind: "desktop", mark: "Ro", hue: "moss",
    where: "gaddo-arch", desc: "App launcher and power menu colours.",
    intro: "A launcher with the alley's vending machines in a side panel, an amber selection and the same slate border as the bar. The palette file also recolours the stock adi1090x launchers, power menus and applets.",
    preview: "rofi",
    install: [
      { title: "Copy the Rofi folder", steps: [
        "This brings the palette, the Tokyo Snow launcher and its side-panel image together:",
      ], code: "git clone https://github.com/MatthewGadsden/gaddo-arch\ncp -r gaddo-arch/rofi ~/.config/" },
      { title: "Open the launcher", code: "~/.config/rofi/launchers/type-4/launcher.sh" },
      { title: "Bind it in Hyprland", steps: ["The config opens it with <kbd>Super</kbd>+<kbd>Space</kbd>:"],
        code: "hl.bind(mainMod .. \" + SPACE\", hl.dsp.exec_cmd(\"~/.config/rofi/launchers/type-4/launcher.sh\"))" },
      { title: "Use the palette in your own theme", steps: [
        "Import the colours file, then use <code>@amber</code>, <code>@night</code> and the rest:",
      ], code: "@import \"~/.config/rofi/colors/tokyo-snow.rasi\"" },
    ],
    mappingTitle: "Where the colours go",
    mapping: [
      ["Window", "night", "1px slate border"],
      ["Input bar", "shadow", "Dim underline"],
      ["Prompt", "ember"],
      ["Search text and entries", "snow"],
      ["Placeholder", "dim"],
      ["Selected entry", "amber", "On slate, with an amber left edge"],
      ["Active entry", "sage"],
      ["Urgent entry", "neon"],
      ["Mode buttons", "shadow", "Dim text"],
      ["Selected mode", "slate", "Gold text"],
    ],
    details: {
      source: { label: "gaddo-arch/rofi", href: `${ARCH}/tree/main/rofi` },
      links: [{ label: "adi1090x/rofi", href: "https://github.com/adi1090x/rofi" }],
      files: [archFile("rofi/colors/tokyo-snow.rasi"), archFile("rofi/launchers/type-4/style-tokyo-snow.rasi"), archFile("rofi/images/tokyo-snow.jpg")],
      variants: DEFAULT_ONLY,
      requires: "Rofi and FiraCode Nerd Font.",
    },
  },
  {
    slug: "bash", name: "Bash", kind: "terminal", mark: "$_", hue: "amber",
    where: "mgadsden-configs", desc: "tokyo-snow.theme gives a c_<name> ANSI escape for every colour.",
    intro: "tokyo-snow.theme is a file you source from bash. It defines a 24-bit ANSI escape for every colour, a table of hex values, and four variants. The terminal greeting uses it for its colours.",
    preview: "bash",
    shellVariants: true,
    install: [
      { title: "Copy and source the theme", code: "cp tokyo-snow.theme ~/.config/\necho 'source ~/.config/tokyo-snow.theme' >> ~/.bashrc" },
      { title: "Pick a variant", steps: ["Set the variant before the theme is sourced. The Oh My Posh prompt reads the same variable."],
        code: "export TOKYO_SNOW_VARIANT=neon-alley   # lamplit-glow | lamplit | neon-alley | vending-glow" },
      { title: "Use the colours", code: "printf '%sHello%s\\n' \"$c_amber\" \"$c_reset\"" },
    ],
    mappingTitle: "What it defines",
    mapping: [
      ["c_brick … c_snow", "all", "A foreground escape for each of the 13 colours"],
      ["c_text", "snow", "Body text"],
      ["c_muted", "dim", "Rules and borders"],
      ["theme_hex[<name>]", "all", "'#rrggbb' for every colour"],
      ["theme_swatch", "accents", "The accent names, warm to cool"],
      ["c_bold, c_reset", "none", "Style escapes"],
    ],
    details: {
      source: { label: "mgadsden-configs", href: CONF },
      links: [{ label: "Report an issue", href: `${CONF}/issues` }],
      files: [confFile("tokyo-snow.theme"), { path: "terminal-greeting/", href: `${CONF}/tree/main/terminal-greeting` }],
      variants: SHELL_VARIANTS,
      requires: "Bash 4.2 or newer and a terminal with 24-bit colour.",
    },
  },
  {
    slug: "oh-my-posh", name: "Oh My Posh", kind: "terminal", mark: "❯❯", hue: "ember",
    where: "mgadsden-configs", desc: "A prompt that reads the same TOKYO_SNOW_VARIANT as the shell theme.",
    intro: "A two-line powerline prompt. User, path and git status sit on the left, with run time, clock, day and Node version on the right, and an amber >> on the second line. All four variants are built in as oh-my-posh palettes.",
    preview: "omp",
    shellVariants: true,
    install: [
      { title: "Copy the prompt and start it from bash", code: "cp gaddo-omp-prompt.json ~/.config/\necho 'eval \"$(oh-my-posh init bash --config ~/.config/gaddo-omp-prompt.json)\"' >> ~/.bashrc" },
      { title: "Pick a variant", steps: ["The prompt reads <code>TOKYO_SNOW_VARIANT</code> and falls back to lamplit-glow."],
        code: "export TOKYO_SNOW_VARIANT=vending-glow" },
    ],
    activate: "The config uses the version 3 format, so it needs a recent oh-my-posh (tested with 25.21). Use a Nerd Font in your terminal so the segment icons and separators render.",
    mappingTitle: "Where the colours go",
    mapping: [
      ["Leading icon", "ember", "Night text"],
      ["User", "gold", "Night text"],
      ["Path", "snow", "Night text"],
      ["Git status", "moss", "Night text"],
      ["Run time, clock and day", "shadow", "Snow text"],
      ["Node version", "pine", "On shadow"],
      ["Separators", "dim"],
      ["Prompt >>", "amber"],
      ["Root indicator", "neon"],
    ],
    details: {
      source: { label: "mgadsden-configs", href: CONF },
      links: [{ label: "Oh My Posh docs", href: "https://ohmyposh.dev/docs" }, { label: "Report an issue", href: `${CONF}/issues` }],
      files: [confFile("gaddo-omp-prompt.json")],
      variants: SHELL_VARIANTS,
      requires: "oh-my-posh 25 or newer and a Nerd Font.",
    },
  },
];
})();
