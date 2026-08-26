/* HZR Custom Concrete — implemented from "HZR Site.dc.html" (Claude Design).
   Three behaviours: the header's scrolled state, the two estimate forms'
   demo submit, and the licensing toggle. Everything else is CSS. */
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

  /* ---- header: transparent over the hero, dark bar once scrolled ---- */
  const hdr = document.querySelector("[data-hdr]");
  if (hdr) {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        hdr.classList.toggle("is-stuck", window.scrollY > 60);
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
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
