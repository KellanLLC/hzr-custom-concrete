/* HZR Custom Concrete — implemented from "HZR Site.dc.html" (Claude Design).
   Four behaviours: the header's scrolled state, the narrow-width menu, the
   sticky call bar stepping aside for the hero and the estimate form, and the
   two estimate forms' submit. Everything else is CSS. */
(() => {
  "use strict";

  /* ---------------------------------------------------------------
     LICENSING — deliberately OFF until verified.
     The design carries "Licensed, bonded & insured · CSLB #…" copy,
     but no claim ships until Anthony's CSLB number is confirmed
     (verify at cslb.ca.gov or 800-321-2752). When it is, put the
     real number in the string below and every licensing line on the
     page switches on at once. Never ship a placeholder number.
     --------------------------------------------------------------- */
  const CSLB_NUMBER = "";

  if (CSLB_NUMBER.trim()) {
    const num = CSLB_NUMBER.trim();
    const set = (slot, text) => {
      document.querySelectorAll(`[data-license="${slot}"]`).forEach((el) => (el.textContent = text));
    };
    set("trust-t", "Licensed, bonded & insured");
    set("trust-d", "CSLB #" + num);
    set("facts-v", "Licensed, bonded and insured · CSLB #" + num);
    set("footer-line", "Licensed, bonded & insured · CSLB #" + num);
    set("footer-p", "Owner-run concrete contractor for residential and commercial property across Ventura County, California. Licensed, bonded and insured.");
  }

  const hdr = document.querySelector("[data-hdr]");
  const bar = document.querySelector("[data-callbar]");

  /* ---- what the scroll position drives ----
     The header goes from transparent over the hero to a solid bar, and the
     sticky call bar steps aside for the hero and the estimate form, which
     carry their own calls to action. "Steps aside" means once a section
     actually fills the screen, not when a sliver of it is peeking in.
     Both read straight off the scroll position rather than an observer, so
     the bar is never left stranded offstage by an event that never fires. */
  const heroEl = document.getElementById("top");
  const estimateEl = document.getElementById("estimate");
  const BAR_H = 86;

  const fills = (el, room) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return Math.min(r.bottom, room) - Math.max(r.top, 0) >= room * 0.6;
  };

  const sync = () => {
    if (hdr) hdr.classList.toggle("is-stuck", window.scrollY > 60);
    if (bar) {
      const room = Math.max((window.innerHeight || 0) - BAR_H, 1);
      bar.classList.toggle("is-here", !(fills(heroEl, room) || fills(estimateEl, room)));
    }
  };

  sync();
  addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync, { passive: true });

  /* ---- the narrow-width menu ----
     The button only exists once this script has run (the `js` class on
     <html> reveals it), so with no JS the links stay out in the bar and
     nothing is stranded behind a control that cannot open. */
  const menuBtn = document.querySelector("[data-menu]");
  if (hdr && menuBtn) {
    const setMenu = (open) => {
      hdr.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", () => setMenu(!hdr.classList.contains("is-open")));
    hdr.querySelectorAll(".hdr__panel a").forEach((a) =>
      a.addEventListener("click", () => setMenu(false)));
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && hdr.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    const wide = matchMedia("(min-width: 1041px)");
    const onWide = () => { if (wide.matches) setMenu(false); };
    wide.addEventListener ? wide.addEventListener("change", onWide) : wide.addListener(onWide);
  }

  /* ---- estimate forms: validate, then swap to the thank-you ----
     There is no back end yet, so the submit is caught client-side.
     Wiring it to email/text Anthony is a Cloudflare Worker or form
     service away; the markup needs no change for that. */
  document.querySelectorAll("[data-form]").forEach((form) => {
    const panel = form.parentElement;
    const thanks = panel.querySelector("[data-thanks]");
    if (!thanks) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let bad = null;
      form.querySelectorAll("input[required]").forEach((el) => {
        const empty = !el.value.trim();
        el.closest(".fld")?.classList.toggle("is-bad", empty);
        if (empty && !bad) bad = el;
      });
      if (bad) { bad.focus(); return; }
      form.hidden = true;
      thanks.hidden = false;
    });

    panel.querySelector("[data-reset]")?.addEventListener("click", () => {
      form.reset();
      form.querySelectorAll(".fld").forEach((el) => el.classList.remove("is-bad"));
      thanks.hidden = true;
      form.hidden = false;
    });

    form.querySelectorAll("input, textarea").forEach((el) =>
      el.addEventListener("input", () => el.closest(".fld")?.classList.remove("is-bad")));
  });
})();
