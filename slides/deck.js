/* =====================================================================
   deck.js: navigation, builds, animations and the picture editor
   for slides styled with global.css. No dependencies.

   Keys
     → ↓ Space PageDown     next build / next slide
     ← ↑ PageUp             previous
     Home / End             first / last slide
     O or Esc               overview of all slides
     F                      fullscreen
     N                      speaker notes
     E                      edit pictures (drag, resize, crop, zoom)
     ?                      help
   ===================================================================== */
(() => {
  const W = 1600, H = 900;
  const deck = document.querySelector(".deck");
  const slides = [...deck.querySelectorAll(":scope > .slide")];
  const body = document.body;
  const STORE = "deck-pics:" + location.pathname;
  let cur = -1;

  const roman = n => {
    const t = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    let s = ""; for (const [v, r] of t) while (n >= v) { s += r; n -= v; } return s;
  };
  const titleOf = s => s.dataset.title || (s.querySelector("h1,h2")?.textContent || "").trim();
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { return {}; } },
    set(v) { try { localStorage.setItem(STORE, JSON.stringify(v)); } catch (e) {} },
  };

  /* ---------- theatre (stage.css): the slide seen through a puppet-theatre booth in ebony and brass ---------- */
  const TW = 2040, TH = 1310;
  let theatre = null;
  function boothSVG() {
    const W = 1960, H = 1230, ox = 180, oy = 210, ow = 1600, oh = 900;   // façade and its opening
    const white = "#c4a265", panel = "#1c1c21", panel2 = "#24242a", trim = "#ece8df";
    const fine = "rgba(236,232,223,.28)", dots = ["#f497b6", "#f5a65b", "#8ed6a4", "#86b8f7"];
    return `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">
  <defs>
    <linearGradient id="fBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141417"/><stop offset="1" stop-color="#08080a"/></linearGradient>
    <pattern id="balu" width="48" height="70" patternUnits="userSpaceOnUse" x="10" y="1140">
      <path d="M14 0 H34 V6 H30 C40 18 40 30 30 40 C36 48 36 58 32 64 H34 V70 H14 V64 H16 C12 58 12 48 18 40 C8 30 8 18 18 6 H14 Z" fill="#1c1c21" stroke="${white}" stroke-width="1.5"/>
    </pattern>
    <g id="lyre" fill="none" stroke="${white}" stroke-width="4" stroke-linecap="round">
      <path d="M-14 26 C-30 4 -26 -24 -12 -30 M14 26 C30 4 26 -24 12 -30 M-14 26 H14 M-6 -18 V24 M0 -20 V24 M6 -18 V24"/>
      <circle cx="-12" cy="-32" r="4" fill="${white}"/><circle cx="12" cy="-32" r="4" fill="${white}"/>
    </g>
    <g id="corner">
      <rect x="30" y="34" width="124" height="150" rx="4" fill="${panel}" stroke="${white}" stroke-width="5"/>
      <ellipse cx="92" cy="109" rx="42" ry="54" fill="${panel2}" stroke="${white}" stroke-width="4"/>
      <ellipse cx="92" cy="109" rx="31" ry="42" fill="none" stroke="${fine}" stroke-width="1.5"/>
      <use href="#lyre" transform="translate(92 112) scale(.95)"/>
    </g>
    <g id="column">
      <rect x="26" y="228" width="128" height="864" rx="4" fill="${panel}" stroke="${white}" stroke-width="5"/>
      <path d="M48 560 V330 Q90 280 132 330 V560 Z" fill="#050506" stroke="${white}" stroke-width="4"/>
      <path d="M60 552 V338 Q90 302 120 338 V552" fill="none" stroke="${fine}" stroke-width="1.5"/>
      <rect x="40" y="560" width="100" height="12" fill="${white}"/>
      <rect x="48" y="640" width="84" height="420" fill="${panel2}" stroke="${white}" stroke-width="3"/>
      <path d="M90 740 L120 850 L90 960 L60 850 Z" fill="none" stroke="${white}" stroke-width="3"/>
      <circle cx="90" cy="850" r="10" fill="currentColor"/>
    </g>
  </defs>

  <path fill-rule="evenodd" fill="url(#fBody)" d="M0 0 H${W} V${H} H0 Z M${ox} ${oy} V${oy + oh} H${ox + ow} V${oy} Z"/>
  <rect x="8" y="8" width="${W - 16}" height="${H - 16}" fill="none" stroke="${white}" stroke-width="4"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="${fine}" stroke-width="2"/>

  <use href="#corner"/>
  <use href="#corner" x="1776"/>
  <path d="M200 186 V78 Q980 -12 1760 78 V186 Z" fill="${panel}" stroke="${white}" stroke-width="5"/>
  <path d="M222 170 V92 Q980 10 1738 92 V170 Z" fill="none" stroke="${fine}" stroke-width="2"/>
  <path d="M330 118 Q510 176 700 118 M1260 118 Q1450 176 1630 118" fill="none" stroke="${white}" stroke-width="3"/>
  <circle cx="330" cy="118" r="8" fill="${dots[0]}"/><circle cx="700" cy="118" r="8" fill="${dots[1]}"/>
  <circle cx="1260" cy="118" r="8" fill="${dots[2]}"/><circle cx="1630" cy="118" r="8" fill="${dots[3]}"/>
  <path d="M850 110 C810 70 760 80 770 115 C778 140 810 132 805 112 M1110 110 C1150 70 1200 80 1190 115 C1182 140 1150 132 1155 112" fill="none" stroke="${white}" stroke-width="4"/>
  <ellipse cx="980" cy="110" rx="130" ry="58" fill="${panel2}" stroke="${white}" stroke-width="4"/>
  <ellipse cx="980" cy="110" rx="112" ry="44" fill="none" stroke="${fine}" stroke-width="1.5"/>
  <use href="#lyre" transform="translate(980 112) scale(1.05)"/>

  <use href="#column" style="color:${dots[0]}"/>
  <use href="#column" x="1780" style="color:${dots[3]}"/>

  <rect x="${ox - 14}" y="${oy - 14}" width="${ow + 28}" height="${oh + 28}" fill="none" stroke="${white}" stroke-width="8"/>
  <rect x="${ox - 24}" y="${oy - 24}" width="${ow + 48}" height="${oh + 48}" fill="none" stroke="${fine}" stroke-width="2"/>

  <rect x="0" y="1124" width="${W}" height="16" fill="${white}"/>
  <rect x="10" y="1140" width="${W - 20}" height="70" fill="url(#balu)"/>
  <rect x="0" y="1210" width="${W}" height="14" fill="${white}"/>

</svg>`;
  }
  function buildTheatre() {
    theatre = el("div", "theatre");
    deck.parentNode.insertBefore(theatre, deck);
    theatre.appendChild(deck);
    const add = (cls, html) => { const e = el("div", cls, html); e.setAttribute("aria-hidden", "true"); theatre.appendChild(e); return e; };
    add("room-floor");
    add("batten");
    add("facade", boothSVG());
  }
  if (body.dataset.stage === "theatre") buildTheatre();

  let rollT;
  function rollDown() {
    if (!theatre || !body.classList.contains("theatre-on")) return;
    theatre.classList.remove("rolling");
    void theatre.offsetWidth;                    // restart the animation
    theatre.classList.add("rolling");
    clearTimeout(rollT);
    rollT = setTimeout(() => theatre.classList.remove("rolling"), 1350);
  }

  /* ---------- prepare slides ---------- */
  deck.appendChild(el("div", "grain"));

  slides.forEach((s, i) => {
    s.dataset.index = i;
    if (s.dataset.chapter && !s.classList.contains("no-runner") && !s.querySelector(".runner")) {
      const r = el("header", "runner");
      r.append(el("span", "", s.dataset.chapter), el("span", "", "Fol. " + roman(i + 1)));
      s.prepend(r);
    }
  });

  // typewriter: split text into timed spans
  document.querySelectorAll('[data-anim="type"]').forEach(t => {
    const text = t.textContent.trim();
    t.setAttribute("aria-label", text);
    t.textContent = "";
    [...text].forEach((ch, i) => { const sp = el("span"); sp.textContent = ch; sp.style.setProperty("--i", i); sp.setAttribute("aria-hidden", "true"); t.appendChild(sp); });
  });

  // stagger SVG strokes inside data-anim="draw"
  document.querySelectorAll('[data-anim="draw"]').forEach(svg =>
    svg.querySelectorAll("[pathLength]").forEach((p, k) => { if (!p.style.getPropertyValue("--k")) p.style.setProperty("--k", k); }));

  // pictures: wrap the image in a crop window, add placeholder, decoration and resize handle
  const pics = [];
  slides.forEach((s, si) => s.querySelectorAll(".pic").forEach((p, pi) => {
    p.dataset.key = p.dataset.id || `${si}:${pi}`;
    p.dataset.origStyle = p.getAttribute("style") || "";
    const win = el("div", "pic-win");
    const img = p.querySelector("img");
    if (img && img.getAttribute("src")) { win.appendChild(img); img.draggable = false; }
    else {
      if (img) img.remove();
      const ph = el("div", "pic-ph");
      ph.append(el("span", "ph-kind", p.dataset.kind || "Photograph"), el("span", "ph-label"), el("span", "ph-size"));
      ph.querySelector(".ph-label").textContent = p.dataset.label || "Picture to be inserted";
      win.appendChild(ph);
    }
    win.appendChild(el("div", "pic-deco"));
    p.prepend(win);
    p.appendChild(el("span", "pic-handle"));
    pics.push(p);
  }));

  // show the frame size on placeholders so you know what image to look for
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(entries => entries.forEach(en => {
      const sz = en.target.querySelector(".ph-size");
      if (sz) sz.textContent = `frame ${Math.round(en.target.offsetWidth)} × ${Math.round(en.target.offsetHeight)}`;
    }));
    document.querySelectorAll(".pic-win").forEach(w => ro.observe(w));
  }

  // re-apply picture tweaks saved during an earlier editing session
  function applyStored() {
    const saved = store.get();
    pics.forEach(p => { if (saved[p.dataset.key] != null) p.setAttribute("style", saved[p.dataset.key]); });
    applyBadge();
  }

  /* ---------- navigation bar ---------- */
  const nav = el("nav", "navbar");
  nav.setAttribute("aria-label", "Slide navigation");
  const bPrev = el("button", "", "‹"); bPrev.title = "Previous (←)"; bPrev.setAttribute("aria-label", "Previous slide");
  const bNext = el("button", "", "›"); bNext.title = "Next (→)"; bNext.setAttribute("aria-label", "Next slide");
  const mid = el("div", "nb-mid");
  const ttl = el("div", "nb-title");
  const chap = el("span", "nb-chapter"), name = el("span", "nb-name");
  const tweakBadge = el("span", "nb-tweaks");
  ttl.append(chap, name, tweakBadge);
  const track = el("div", "nb-track");
  const ticks = slides.map((s, i) => {
    const t = el("button", "nb-tick" + (s.classList.contains("l-chapter") || s.classList.contains("l-title") ? " chapter" : ""));
    t.title = `${roman(i + 1)}. ${titleOf(s)}`;
    t.setAttribute("aria-label", `Go to slide ${i + 1}: ${titleOf(s)}`);
    t.addEventListener("click", () => go(i));
    track.appendChild(t);
    return t;
  });
  mid.append(ttl, track);
  const count = el("span", "nb-count");
  const tool = (label, title, fn) => { const b = el("button", "tool", label); b.title = title; b.addEventListener("click", fn); return b; };
  nav.append(bPrev, mid, count, bNext,
    tool("▦", "Overview (O)", toggleOverview),
    tool("✎", "Edit pictures (E)", toggleEdit),
    tool("⛶", "Fullscreen (F)", toggleFull),
    tool("?", "Help (?)", () => body.classList.toggle("show-help")));
  bPrev.addEventListener("click", prev);
  bNext.addEventListener("click", next);
  body.appendChild(nav);

  /* ---------- overview, help, notes, editor HUD ---------- */
  const overview = el("div", "overview");
  body.appendChild(overview);

  const help = el("div", "help", `
    <h3>Using this deck</h3>
    <table>
      <tr><td><kbd>→</kbd> <kbd>Space</kbd> <kbd>PgDn</kbd></td><td>Next build or slide</td></tr>
      <tr><td><kbd>←</kbd> <kbd>PgUp</kbd></td><td>Previous</td></tr>
      <tr><td><kbd>Home</kbd> <kbd>End</kbd></td><td>First / last slide</td></tr>
      <tr><td><kbd>O</kbd> or <kbd>Esc</kbd></td><td>Overview of every slide</td></tr>
      <tr><td><kbd>F</kbd></td><td>Fullscreen</td></tr>
      <tr><td><kbd>N</kbd></td><td>Speaker notes</td></tr>
      <tr><td><kbd>T</kbd></td><td>Theatre on / off</td></tr>
      <tr><td><kbd>E</kbd></td><td>Edit pictures: drag, resize, crop and zoom, then copy the values into the HTML</td></tr>
      <tr><td><kbd>?</kbd></td><td>This card</td></tr>
    </table>`);
  help.addEventListener("click", () => body.classList.remove("show-help"));
  body.appendChild(help);

  const notesPanel = el("div", "notes-panel");
  body.appendChild(notesPanel);

  const hud = el("div", "edit-hud", `
    <div class="eh-title">Picture editor · press E to finish</div>
    <ul>
      <li><b>Drag</b> a free picture to move it; drag a framed one to pan the crop</li>
      <li><b>Shift + drag</b> pans the crop of a free picture</li>
      <li><b>Corner handle</b> resizes · <b>scroll</b> zooms the crop · <b>Shift + scroll</b> rotates</li>
    </ul>
    <code>Click a picture to select it.</code>
    <button data-act="copy">Copy style</button><button data-act="reset">Reset picture</button><button data-act="clear">Clear all tweaks</button>`);
  body.appendChild(hud);
  const hudCode = hud.querySelector("code");

  /* ---------- core: show slide / builds ---------- */
  function fit() {
    if (theatre && body.classList.contains("theatre-on")) {
      const t = Math.min(innerWidth / TW, innerHeight / TH);
      theatre.style.setProperty("--tscale", t);
      deck.style.setProperty("--scale", t);       // used by the picture editor's drag maths
      return;
    }
    const s = Math.min(innerWidth / W, innerHeight / H);
    deck.style.setProperty("--scale", s);
  }

  function stepsOf(s) { return [...s.querySelectorAll(".step")]; }

  function show(i, showAllSteps = false) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const s = slides[i];
    if (i !== cur) {
      const prevSlide = slides[cur];
      if (prevSlide) prevSlide.querySelectorAll("audio:not(.slide-sound)").forEach(a => a.pause());   // stop recordings on the way out
      if (prevSlide) prevSlide.querySelectorAll("audio.slide-sound").forEach(a => fadeOut(a));        // background music fades
      if (prevSlide) prevSlide.querySelectorAll(".video iframe").forEach(f => f.remove());   // stop videos too
      // leaving a live demo: unload it so its sound stops (it reloads on return)
      if (prevSlide) prevSlide.querySelectorAll("iframe[data-src]").forEach(f => f.removeAttribute("src"));
      if (prevSlide && theatre && body.classList.contains("theatre-on")) {
        slides.forEach(x => x.classList.remove("leaving"));
        prevSlide.classList.add("leaving");                     // stays hung until the new paper covers it
        setTimeout(() => prevSlide.classList.remove("leaving"), 1400);
      }
      rollDown();
      slides.forEach((x, k) => x.classList.toggle("active", k === i));
      cur = i;
      stepsOf(s).forEach(st => st.classList.toggle("shown", showAllSteps));
      onEnter(s);
    }
    ticks.forEach((t, k) => { t.classList.toggle("now", k === i); t.classList.toggle("past", k < i); });
    chap.textContent = s.dataset.chapter ? s.dataset.chapter.split("·")[0].trim() : "";
    name.textContent = titleOf(s);
    count.textContent = `${roman(i + 1)} / ${roman(slides.length)}`;
    bPrev.disabled = i === 0; bNext.disabled = i === slides.length - 1 && !stepsOf(s).some(x => !x.classList.contains("shown"));
    const n = s.querySelector(".notes");
    notesPanel.innerHTML = `<div class="np-head">Notes · ${roman(i + 1)}</div>` + (n ? n.innerHTML : "<em>No notes for this slide.</em>");
    if (location.hash !== "#" + (i + 1)) history.replaceState(null, "", "#" + (i + 1));
    select(null);
  }

  /* ---------- slide sounds ----------
     <audio class="slide-sound" src="…" data-start="0" data-end="32" data-vol=".8"> inside a slide
     plays by itself when the slide opens and fades out when you leave. M stops / restarts it.
     Browsers refuse sound before the first key press or click on the page, so if the opening
     slide's music is refused, that first press starts the music instead of turning the page. */
  let soundBlocked = false;
  const sounds = [...document.querySelectorAll("audio.slide-sound")];
  sounds.forEach(a => {
    a.addEventListener("error", () => { a.dataset.missing = "1"; soundBlocked = false; });
    a.addEventListener("timeupdate", () => { if (a.dataset.end && a.currentTime >= +a.dataset.end && !a._fading) fadeOut(a); });
    // Thank you slide: the letters march while the music plays and halt, feet together, when it stops
    const marchers = [...a.closest(".slide").querySelectorAll(".march .m > span")];
    a.addEventListener("play", () => marchers.forEach(m => { m.style.animation = ""; }));
    a.addEventListener("pause", () => marchers.forEach(m =>
      m.addEventListener("animationiteration", () => { if (a.paused) m.style.animation = "none"; }, { once: true })));
  });
  function fadeOut(a, ms = 1400) {
    clearTimeout(a._stopTimer);
    if (a.paused) return;
    a._fading = true; const v0 = a.volume, t0 = performance.now();
    const tick = now => {
      const k = Math.min(1, (now - t0) / ms);
      a.volume = v0 * (1 - k);
      if (k < 1 && a._fading) requestAnimationFrame(tick); else { a.pause(); a._fading = false; }
    };
    requestAnimationFrame(tick);
  }
  function playSlideSound(s) {
    const a = s.querySelector("audio.slide-sound");
    if (!a || a.dataset.missing) return;
    a._fading = false; a.volume = +(a.dataset.vol || 1);
    const start = +(a.dataset.start || 0);
    const seek = () => { try { a.currentTime = start; } catch (e) {} };
    if (a.readyState >= 1) seek(); else a.addEventListener("loadedmetadata", seek, { once: true });
    clearTimeout(a._stopTimer);
    const p = a.play();
    // stop after the chosen stretch even if the browser is slow to report the play position
    const armStop = () => { if (a.dataset.end) a._stopTimer = setTimeout(() => fadeOut(a), Math.max(0, (+a.dataset.end - start) * 1000 - 1400)); };
    if (p) p.then(() => { soundBlocked = false; armStop(); })
            .catch(() => { if (!a.dataset.missing && !a.error && s === slides[cur]) soundBlocked = true; });
  }
  function toggleSlideSound() {
    const a = slides[cur].querySelector("audio.slide-sound");
    if (!a) return;
    if (a.paused) playSlideSound(slides[cur]); else fadeOut(a, 600);
  }
  // music was refused: the first key press or click starts it (and is not used to turn the page)
  const unlockSound = e => {
    if (!soundBlocked) return;
    soundBlocked = false;
    const a = slides[cur] && slides[cur].querySelector("audio.slide-sound");
    if (!a || a.dataset.missing || !a.paused) return;
    playSlideSound(slides[cur]);
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.type === "pointerdown") swallowClick = true;
  };
  let swallowClick = false;
  addEventListener("keydown", e => { if (!e.metaKey && !e.ctrlKey && !e.altKey && e.key.length) unlockSound(e); }, { capture: true });
  addEventListener("pointerdown", unlockSound, { capture: true });
  addEventListener("click", e => { if (swallowClick) { swallowClick = false; e.preventDefault(); e.stopImmediatePropagation(); } }, { capture: true });

  function onEnter(s) {
    soundBlocked = false;
    playSlideSound(s);
    // lazy-load embedded demos
    s.querySelectorAll("iframe[data-src]").forEach(f => { if (!f.src) f.src = f.dataset.src; });
    // count-up numbers
    s.querySelectorAll("[data-count]").forEach(n => {
      const target = parseFloat(n.dataset.count), dur = +(n.dataset.dur || 2200), delay = +(n.dataset.delay || 300);
      const fmt = v => Math.round(v).toLocaleString("en-US");
      n.textContent = fmt(0);
      const t0 = performance.now() + delay;
      const tick = now => {
        if (!s.classList.contains("active")) return;
        const k = Math.min(1, Math.max(0, (now - t0) / dur));
        n.textContent = fmt(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function next() {
    const s = slides[cur], hidden = stepsOf(s).find(x => !x.classList.contains("shown"));
    if (hidden) { hidden.classList.add("shown"); show(cur); return; }
    if (cur < slides.length - 1) show(cur + 1);
  }
  function prev() {
    const shown = stepsOf(slides[cur]).filter(x => x.classList.contains("shown"));
    if (shown.length) { shown.at(-1).classList.remove("shown"); show(cur); return; }
    if (cur > 0) show(cur - 1, true);
  }
  function go(i) { closeOverview(); show(i); }

  /* ---------- overview ---------- */
  function toggleOverview() { body.classList.contains("show-overview") ? closeOverview() : openOverview(); }
  function closeOverview() { body.classList.remove("show-overview"); }
  function openOverview() {
    overview.innerHTML = "";
    slides.forEach((s, i) => {
      const item = el("div", "ov-item" + (i === cur ? " now" : ""));
      const frame = el("div", "ov-frame");
      const clone = s.cloneNode(true);
      clone.classList.remove("active");
      clone.querySelectorAll("iframe").forEach(f => f.remove());
      clone.querySelectorAll(".notes").forEach(n => n.remove());
      frame.appendChild(clone);
      const cap = el("div", "ov-cap");
      cap.append(el("b", "", roman(i + 1)), el("span", "", ""));
      cap.lastChild.textContent = titleOf(s);
      item.append(frame, cap);
      item.addEventListener("click", () => go(i));
      overview.appendChild(item);
    });
    body.classList.add("show-overview");
    requestAnimationFrame(() => overview.querySelectorAll(".ov-frame").forEach(f => f.style.setProperty("--ov-scale", f.clientWidth / W)));
    overview.querySelector(".now")?.scrollIntoView({ block: "center" });
  }

  /* ---------- fullscreen, idle ---------- */
  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }
  let idleT;
  function wake() {
    body.classList.remove("idle");
    clearTimeout(idleT);
    idleT = setTimeout(() => { if (!nav.matches(":hover") && !body.classList.contains("editing")) body.classList.add("idle"); }, 2800);
  }

  /* ---------- picture editor ---------- */
  const VARS = ["--x", "--y", "--w", "--h", "--rot", "--fx", "--fy", "--zoom"];
  let sel = null;
  function toggleEdit() {
    body.classList.toggle("editing");
    if (!body.classList.contains("editing")) select(null);
    wake();
  }
  function select(p) {
    pics.forEach(x => x.classList.toggle("sel", x === p));
    sel = p;
    hudCode.textContent = p ? styleString(p) : "Click a picture to select it.";
  }
  function styleString(p) {
    const parts = VARS.map(v => [v, p.style.getPropertyValue(v).trim()]).filter(([, val]) => val);
    const other = (p.dataset.origStyle || "").split(";").map(x => x.trim()).filter(x => x && !VARS.includes(x.split(":")[0].trim()));
    const all = [...other, ...parts.map(([k, v]) => `${k}:${v}`)];
    return all.length ? `style="${all.join("; ")}"` : "(no adjustments yet)";
  }
  function save(p) {
    const saved = store.get();
    saved[p.dataset.key] = p.getAttribute("style") || "";
    store.set(saved);
    applyBadge();
    hudCode.textContent = styleString(p);
  }
  function applyBadge() {
    const n = Object.keys(store.get()).length;
    body.classList.toggle("has-tweaks", n > 0);
    tweakBadge.textContent = n ? `✎ ${n} local picture tweak${n > 1 ? "s" : ""}` : "";
  }
  const num = (p, v, d) => { const x = parseFloat(p.style.getPropertyValue(v)); return isNaN(x) ? d : x; };
  const round = x => Math.round(x * 10) / 10;

  deck.addEventListener("pointerdown", e => {
    if (!body.classList.contains("editing")) return;
    const p = e.target.closest(".slide.active .pic");
    if (!p) { select(null); return; }
    e.preventDefault();
    select(p);
    const scale = parseFloat(deck.style.getPropertyValue("--scale")) || 1;
    const free = p.classList.contains("free");
    const mode = e.target.classList.contains("pic-handle") ? "resize" : (free && !e.shiftKey ? "move" : "pan");
    const win = p.querySelector(".pic-win");
    const start = {
      x: e.clientX, y: e.clientY,
      px: num(p, "--x", p.offsetLeft), py: num(p, "--y", p.offsetTop),
      w: num(p, "--w", p.offsetWidth), h: num(p, "--h", p.offsetHeight),
      fx: num(p, "--fx", 50), fy: num(p, "--fy", 50), zoom: num(p, "--zoom", 1),
      ww: win.offsetWidth, wh: win.offsetHeight,
    };
    p.setPointerCapture(e.pointerId);
    const onMove = ev => {
      const dx = (ev.clientX - start.x) / scale, dy = (ev.clientY - start.y) / scale;
      if (mode === "move") {
        p.style.setProperty("--x", round(start.px + dx) + "px");
        p.style.setProperty("--y", round(start.py + dy) + "px");
      } else if (mode === "resize") {
        p.style.setProperty("--w", Math.max(60, round(start.w + dx)) + "px");
        p.style.setProperty("--h", Math.max(60, round(start.h + dy)) + "px");
      } else {
        const clamp = v => Math.max(0, Math.min(100, v));
        p.style.setProperty("--fx", round(clamp(start.fx - dx / start.ww * 100 / start.zoom)) + "%");
        p.style.setProperty("--fy", round(clamp(start.fy - dy / start.wh * 100 / start.zoom)) + "%");
      }
      hudCode.textContent = styleString(p);
    };
    const onUp = () => { p.removeEventListener("pointermove", onMove); p.removeEventListener("pointerup", onUp); save(p); };
    p.addEventListener("pointermove", onMove);
    p.addEventListener("pointerup", onUp);
  });

  deck.addEventListener("wheel", e => {
    if (!body.classList.contains("editing")) return;
    const p = e.target.closest(".slide.active .pic");
    if (!p) return;
    e.preventDefault();
    select(p);
    if (e.shiftKey) {
      const d = e.deltaY || e.deltaX;
      p.style.setProperty("--rot", round(num(p, "--rot", 0) + Math.sign(d) * .5) + "deg");
    } else {
      const z = Math.max(1, Math.min(5, num(p, "--zoom", 1) * (e.deltaY > 0 ? .96 : 1.04)));
      p.style.setProperty("--zoom", Math.round(z * 100) / 100);
    }
    save(p);
  }, { passive: false });

  hud.addEventListener("click", e => {
    const act = e.target.dataset.act;
    if (act === "copy" && sel) navigator.clipboard?.writeText(styleString(sel)).then(() => { e.target.textContent = "Copied ✓"; setTimeout(() => e.target.textContent = "Copy style", 1200); });
    if (act === "reset" && sel) {
      sel.setAttribute("style", sel.dataset.origStyle);
      const saved = store.get(); delete saved[sel.dataset.key]; store.set(saved);
      applyBadge(); hudCode.textContent = styleString(sel);
    }
    if (act === "clear" && confirm("Remove every saved picture tweak in this browser?")) {
      store.set({}); pics.forEach(p => p.setAttribute("style", p.dataset.origStyle)); applyBadge(); select(sel);
    }
  });

  /* ---------- input ---------- */
  document.addEventListener("keydown", e => {
    if (e.target.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
    wake();
    const k = e.key;
    if (body.classList.contains("show-overview")) {
      if (k === "Escape" || k === "o" || k === "O") closeOverview();
      return;
    }
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(k)) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) { e.preventDefault(); prev(); }
    else if (k === "Home") show(0);
    else if (k === "End") show(slides.length - 1, true);
    else if (k === "o" || k === "O" || k === "Escape") { if (body.classList.contains("show-help")) body.classList.remove("show-help"); else openOverview(); }
    else if (k === "f" || k === "F") toggleFull();
    else if (k === "n" || k === "N") body.classList.toggle("show-notes");
    else if (k === "e" || k === "E") toggleEdit();
    else if ((k === "t" || k === "T") && theatre) { body.classList.toggle("theatre-on"); fit(); }
    else if (k === "?") body.classList.toggle("show-help");
    else if (k === "m" || k === "M") toggleSlideSound();
  });

  let touch = null;
  deck.addEventListener("touchstart", e => { touch = e.touches[0]; }, { passive: true });
  deck.addEventListener("touchend", e => {
    if (!touch || body.classList.contains("editing")) return;
    const dx = e.changedTouches[0].clientX - touch.clientX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touch = null;
  }, { passive: true });

  // demonstrations bench: clicking an experiment loads it into the simulator on the same slide
  deck.addEventListener("click", e => {
    const b = e.target.closest(".exp[data-preset]");
    if (!b || body.classList.contains("editing")) return;
    const slide = b.closest(".slide"), f = slide.querySelector("iframe[data-src]");
    slide.querySelectorAll(".exp").forEach(x => x.classList.toggle("on", x === b));
    const t = slide.querySelector(".rail .try"); if (t) t.textContent = b.dataset.try;
    const base = f.dataset.src.split("?")[0];
    f.dataset.src = base + "?preset=" + b.dataset.preset;     // used if the demo reloads
    if (f.getAttribute("src") && f.contentWindow) f.contentWindow.postMessage({ preset: b.dataset.preset }, "*");
    else f.src = f.dataset.src;
  });
  // video posters: click to load the YouTube player in place
  deck.addEventListener("click", e => {
    const b = e.target.closest(".video-poster"); if (!b || body.classList.contains("editing")) return;
    const v = b.closest(".video"), f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${v.dataset.youtube}?autoplay=1&rel=0`;
    f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true; f.title = b.getAttribute("aria-label");
    v.appendChild(f);
  });
  // audio players on recording slides
  const fmt = t => isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}` : "0:00";
  document.querySelectorAll(".player").forEach(p => {
    const au = p.querySelector("audio"), fill = p.querySelector(".pl-fill"), time = p.querySelector(".pl-time");
    const paint = () => { fill.style.width = (au.duration ? au.currentTime / au.duration * 100 : 0) + "%"; time.textContent = `${fmt(au.currentTime)} / ${fmt(au.duration)}`; };
    p.querySelector(".pl-btn").addEventListener("click", () => au.paused ? au.play() : au.pause());
    p.querySelector(".pl-bar").addEventListener("click", e => { const r = e.currentTarget.getBoundingClientRect(); if (au.duration) au.currentTime = (e.clientX - r.left) / r.width * au.duration; });
    au.addEventListener("play", () => p.classList.add("playing"));
    ["pause", "ended"].forEach(ev => au.addEventListener(ev, () => p.classList.remove("playing")));
    ["timeupdate", "loadedmetadata"].forEach(ev => au.addEventListener(ev, paint));
  });
  // keys pressed inside an embedded demo (see demo-bridge.js)
  addEventListener("message", e => {
    const k = e.data && e.data.deckKey;
    if (k === "ArrowRight" || k === "PageDown") next();
    else if (k === "ArrowLeft" || k === "PageUp") prev();
  });
  addEventListener("resize", fit);
  addEventListener("mousemove", wake);
  addEventListener("hashchange", () => { const n = parseInt(location.hash.slice(1), 10); if (n && n - 1 !== cur) show(n - 1); });

  /* ---------- start ---------- */
  applyStored();
  fit();
  show((parseInt(location.hash.slice(1), 10) || 1) - 1);
  wake();
})();
