(() => {
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
    const updateHeader = () => header.classList.toggle("is-sticky", window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }
  if (toggle) toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  if (menu) menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  const cookie = document.querySelector("[data-cookie]");
  const cookieButton = document.querySelector("[data-cookie-accept]");
  if (cookie && !localStorage.getItem("labelle-cookie-ack")) cookie.classList.add("is-visible");
  if (cookieButton) cookieButton.addEventListener("click", () => {
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
  document.querySelectorAll("[data-gallery-image]").forEach((button) => button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image || !lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.galleryImage || image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
  }));
  document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

  document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector("[data-form-status]");
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const topic = form.elements.topic.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
      if (status) status.textContent = "Vyplňte prosím jméno, platný e-mail a zprávu.";
      return;
    }
    if (status) status.textContent = "Otevíráme e-mailovou zprávu pro La Belle Boutique.";
    const subject = topic ? "La Belle Boutique — " + topic : "Zpráva z webu La Belle Boutique";
    const body = "Jméno: " + name + "\nE-mail: " + email + "\n" + (topic ? "Téma: " + topic + "\n" : "") + "\nZpráva:\n" + message;
    window.location.href = "mailto:info@labelleboutique.cz?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      setMenu(false);
    }
  });
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
})();
