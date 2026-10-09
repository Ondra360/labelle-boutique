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

  const cookie = document.querySelector("[data-cookie]");
  const cookieButton = document.querySelector("[data-cookie-accept]");
  if (cookie && !localStorage.getItem("labelle-cookie-ack"))
    cookie.classList.add("is-visible");
  if (cookieButton)
    cookieButton.addEventListener("click", () => {
      localStorage.setItem("labelle-cookie-ack", "true");
      cookie?.classList.remove("is-visible");
    });

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("is-open");
    lightboxImage.src = "";
  };
  document.querySelectorAll("[data-gallery-image]").forEach((button) =>
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!image || !lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.galleryImage || image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-open");
    }),
  );
  document
    .querySelector("[data-lightbox-close]")
    ?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  const contactForm = document.querySelector("[data-contact-form]");
  if (
    contactForm &&
    new URLSearchParams(window.location.search).get("odeslano") === "1"
  ) {
    const status = contactForm.querySelector("[data-form-status]");
    if (status) status.textContent = "Děkujeme — vaše zpráva byla odeslána.";
  }

  const clubForm = document.querySelector("[data-club-form]");
  if (
    clubForm &&
    new URLSearchParams(window.location.search).get("sleva") === "1"
  ) {
    const status = document.querySelector("[data-club-status]");
    if (status)
      status.textContent = "Děkujeme — kód BELLE10 jsme poslali na váš e-mail.";
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      setMenu(false);
    }
  });
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
