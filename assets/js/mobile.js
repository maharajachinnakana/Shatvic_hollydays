/* Shadvic Holidays - mobile JS (no dependencies) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var body = document.body;
  var WA = body.getAttribute("data-wa") || "919496933154";

  /* file:// support: folder links need index.html when opened without a server */
  if (location.protocol === "file:") {
    $$("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!h || /^(#|tel:|mailto:|https?:)/i.test(h)) return;
      if (/\/$/.test(h)) a.setAttribute("href", h + "index.html");
      else if (h === "") a.setAttribute("href", "index.html");
    });
  }

  /* ---------- drawer ---------- */
  var burger = $(".burger"), drawer = $("#drawer"), dscrim = $(".drawer-scrim");
  function setNav(open) {
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.classList.toggle("is-open", open);
    if (open) drawer.removeAttribute("inert"); else drawer.setAttribute("inert", "");
    dscrim.hidden = !open;
    body.classList.toggle("nav-open", open);
  }
  setNav(false);
  burger.addEventListener("click", function () { setNav(burger.getAttribute("aria-expanded") !== "true"); });
  dscrim.addEventListener("click", function () { setNav(false); });
  $$(".tg", drawer).forEach(function (b) {
    b.addEventListener("click", function () {
      var li = b.closest("li"), open = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", open ? "true" : "false");
      li.classList.toggle("is-open", open);
    });
  });
  $$(".sub", drawer).forEach(function (s) { if (!s.parentNode.classList.contains("is-open")) s.setAttribute("aria-hidden", "true"); });
  $$(".tg", drawer).forEach(function (b) {
    b.addEventListener("click", function () {
      var sub = document.getElementById(b.getAttribute("aria-controls"));
      if (sub) sub.setAttribute("aria-hidden", b.getAttribute("aria-expanded") === "true" ? "false" : "true");
    });
  });

  /* ---------- booking sheet ---------- */
  var dock = $("#dock"), sheet = $("#book"), scrim = $(".scrim"), lastFocus = null;
  var inline = $("#book-inline");
  function setVal(f, name, v) { var el = f.elements[name]; if (el && v) el.value = v; }
  function prefill(f, note, trip, frm, to) {
    trip = trip || body.getAttribute("data-trip");
    frm = frm || body.getAttribute("data-frm");
    to = to || body.getAttribute("data-to");
    if (trip && f.elements.type && !f.elements.type.value) {
      Array.prototype.forEach.call(f.elements.type.options, function (o) { if (o.text.toLowerCase() === trip.toLowerCase()) f.elements.type.value = o.text; });
    }
    if (f.elements.ploc && !f.elements.ploc.value) setVal(f, "ploc", frm);
    if (f.elements.dloc && !f.elements.dloc.value) setVal(f, "dloc", to);
    if (note && f.elements.note) f.elements.note.value = note;
  }
  function openBook(note, trip, frm, to) {
    if (!sheet) return;
    setNav(false);
    lastFocus = document.activeElement;
    prefill(sheet, note, trip, frm, to);
    dock.setAttribute("data-state", "open");
    sheet.hidden = false; scrim.hidden = false;
    body.classList.add("sheet-open");
    var first = sheet.elements.persons; if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
  }
  function closeBook() {
    if (!sheet) return;
    dock.setAttribute("data-state", "idle");
    sheet.hidden = true; scrim.hidden = true;
    body.classList.remove("sheet-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-book]");
    if (t) { e.preventDefault(); if (inline && t.closest("main") && body.getAttribute("data-trip") === "" && $("#book-inline")) { inline.scrollIntoView({ behavior: "smooth" }); return; } openBook(); return; }
    var p = e.target.closest("[data-book-note]");
    if (p) { e.preventDefault(); openBook(p.getAttribute("data-book-note")); return; }
    if (e.target.closest("[data-close-book]")) { e.preventDefault(); closeBook(); return; }
    var top = e.target.closest("[data-top]");
    if (top) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (sheet && !sheet.hidden) closeBook();
    else if (burger.getAttribute("aria-expanded") === "true") { setNav(false); burger.focus(); }
  });

  /* ---------- dock: hide while scrolling down, show on scroll up / 3s idle ---------- */
  (function () {
    if (!dock) return;
    var lastY = window.pageYOffset, idle = null, ticking = false;
    function show() { dock.classList.remove("is-hidden"); }
    function arm() { clearTimeout(idle); idle = setTimeout(show, 3000); }
    function onScroll() {
      var y = window.pageYOffset, dy = y - lastY;
      if (dock.getAttribute("data-state") === "open" || body.classList.contains("nav-open")) { show(); lastY = y; return; }
      var atEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 8;
      if (y < 80 || atEnd || dy < -6) show();
      else if (dy > 6) { dock.classList.add("is-hidden"); }
      if (Math.abs(dy) > 6) lastY = y;
      arm();
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { onScroll(); ticking = false; }); } }, { passive: true });
    ["touchend", "touchcancel"].forEach(function (ev) { window.addEventListener(ev, arm, { passive: true }); });
    dock.addEventListener("focusin", show);
  })();

  /* date minimum */
  var d = new Date(), iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  $$('input[type=date]').forEach(function (i) { i.min = iso; });

  function validate(f) {
    var ok = true;
    function bad(name, msg) {
      var el = f.elements[name]; if (!el) return;
      var lab = el.closest(".fld"), err = lab && lab.querySelector(".err");
      if (msg) { ok = false; if (lab) lab.classList.add("bad"); if (err) err.textContent = msg; el.setAttribute("aria-invalid", "true"); }
      else { if (lab) lab.classList.remove("bad"); if (err) err.textContent = ""; el.removeAttribute("aria-invalid"); }
    }
    var n = parseInt(f.elements.persons.value, 10);
    bad("persons", (n >= 1 && n <= 40) ? "" : "Enter 1 to 40 people.");
    bad("type", f.elements.type.value ? "" : "Choose a trip type.");
    bad("pdate", !f.elements.pdate.value ? "Choose a pickup date." : (f.elements.pdate.value < iso ? "Date is in the past." : ""));
    bad("ddate", f.elements.ddate.value && f.elements.ddate.value < f.elements.pdate.value ? "Drop date is before pickup." : "");
    bad("ploc", f.elements.ploc.value.trim() ? "" : "Enter a pickup location.");
    return ok;
  }
  function fmt(v) { if (!v) return "-"; var p = v.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  $$("form[data-book]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(f)) { var b = f.querySelector(".bad input,.bad select"); if (b) b.focus(); return; }
      var el = f.elements, lines = [
        "Hello Shadvic Holidays, I would like to enquire about a taxi.",
        "",
        "Persons: " + el.persons.value,
        "Trip type: " + el.type.value,
        "Pickup date: " + fmt(el.pdate.value),
        "Pickup location: " + el.ploc.value.trim(),
        "Drop date: " + fmt(el.ddate.value),
        "Drop location: " + (el.dloc.value.trim() || "-")
      ];
      if (el.note.value.trim()) lines.push("Note: " + el.note.value.trim());
      lines.push("", "Page: " + document.title);
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  });

  /* ---------- fare finder ---------- */
  var dataEl = $("#fares-data"), fd = $("[data-finder]");
  if (dataEl && fd) {
    var data = {}; try { data = JSON.parse(dataEl.textContent); } catch (e) {}
    var rs = $("[data-f-route]", fd), vs = $("[data-f-veh]", fd), out = $("[data-f-out]", fd), fb = $("[data-f-book]", fd);
    var inr = function (n) { return "₹" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); };
    rs.addEventListener("change", function () {
      var r = data[rs.value];
      vs.innerHTML = "";
      if (!r) { vs.disabled = true; vs.innerHTML = '<option value="">Select route first</option>'; out.textContent = "Pick a route and a vehicle to see the starting fare."; fb.disabled = true; return; }
      vs.disabled = false;
      vs.insertAdjacentHTML("beforeend", '<option value="">Select vehicle</option>');
      r.fares.forEach(function (f, i) { var o = document.createElement("option"); o.value = i; o.textContent = f[0] + " - " + inr(f[1]); vs.appendChild(o); });
      out.textContent = "Now choose a vehicle."; fb.disabled = true;
    });
    vs.addEventListener("change", function () {
      var r = data[rs.value]; if (!r || vs.value === "") { fb.disabled = true; return; }
      var f = r.fares[+vs.value];
      out.textContent = r.label + ", " + f[0] + ": from " + inr(f[1]) + " per vehicle";
      fb.disabled = false;
    });
    fb.addEventListener("click", function () {
      var r = data[rs.value], f = r && r.fares[+vs.value]; if (!f) return;
      openBook("Fare finder: " + r.label + ", " + f[0] + ", from " + inr(f[1]), "Pickup and drop", r.frm, r.to);
    });
  }
})();
