(() => {
  document.documentElement.classList.add("js");

  if (
    window.location.protocol === "http:" &&
    !["localhost", "127.0.0.1"].includes(window.location.hostname)
  ) {
    window.location.replace(
      "https:" + window.location.href.slice(window.location.protocol.length),
    );
    return;
  }
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const setMenu = (open) => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  };
  if (header) {
    const updateHeader = () =>
      header.classList.toggle("is-sticky", window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const revealTargets = document.querySelectorAll(
    ".quote, .feature, .home-grid, .gallery-teaser, .home-cta .shell, .club__inner, .page-hero__content, .intro, .editorial, .brands .shell, .gallery-head, .gallery, .visit-layout, .contact .shell",
  );
  revealTargets.forEach((element) => {
    element.dataset.reveal = element.classList.contains("feature")
      ? "line"
      : "section";
  });
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13 },
    );
    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-revealed"));
  }
  if (toggle)
    toggle.addEventListener("click", () =>
      setMenu(toggle.getAttribute("aria-expanded") !== "true"),
    );
  if (menu)
    menu
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", () => setMenu(false)));

  document.querySelectorAll("[data-map-consent]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".map-card");
      const frame = card?.querySelector("iframe[data-map-src]");
      if (!card || !frame) return;
      frame.src = frame.dataset.mapSrc || "";
      frame.hidden = false;
      card.querySelector(".map-consent")?.remove();
    });
  });

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  let lastFocusedElement = null;
  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    if (lastFocusedElement?.isConnected) lastFocusedElement.focus();
    lastFocusedElement = null;
  };
  document.querySelectorAll("[data-gallery-image]").forEach((button) =>
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!image || !lightbox || !lightboxImage) return;
      lastFocusedElement = document.activeElement;
      lightboxImage.src = button.dataset.galleryImage || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => lightboxClose?.focus());
    }),
  );
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      setMenu(false);
    }
    if (event.key === "Tab" && lightbox?.classList.contains("is-open")) {
      event.preventDefault();
      lightboxClose?.focus();
    }
  });
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
