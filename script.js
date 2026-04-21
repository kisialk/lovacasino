(function () {
  "use strict";

  function setupNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      var t = e.target;
      if (toggle.contains(t) || nav.contains(t)) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupLogoFallback() {
    document.querySelectorAll(".site-logo img").forEach(function (img) {
      var link = img.closest(".site-logo");
      if (!link) return;

      function showImg() {
        img.classList.add("is-ready");
      }

      function applyFallback() {
        link.classList.add("site-logo--text");
        img.remove();
      }

      if (img.complete) {
        if (img.naturalWidth === 0) {
          applyFallback();
        } else {
          showImg();
        }
        return;
      }

      img.addEventListener("load", showImg, { once: true });
      img.addEventListener("error", applyFallback, { once: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setupNavToggle();
      setupLogoFallback();
    });
  } else {
    setupNavToggle();
    setupLogoFallback();
  }
})();
