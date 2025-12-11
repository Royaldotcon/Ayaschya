'use strict';



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR
 * navbar will show after clicking menu button
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);



/**
 * HEADER and BACK TOP BTN
 * header and back top btn will be active after scrolled down to 100px of screen
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);



/**
 * Button hover ripple effect
 */

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);



/**
 * Scroll reveal
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);



/**
 * Custom cursor
 */

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});

const words = ["ayaschya 2k26", "annual techfest of g.c.e.t.t.s"];
let i = 0;          // word index
let j = 0;          // letter index
let current = "";
let isDeleting = false;
let speed = 80;     // typing speed

const element = document.getElementById("typing");

function typeLoop() {

  current = words[i];

  if (isDeleting) {
    j--;
    element.innerHTML = current.substring(0, j);
  } else {
    j++;
    element.innerHTML = current.substring(0, j);
  }

  if (!isDeleting && j === current.length) {
    // pause at full word
    setTimeout(() => { isDeleting = true; }, 800);
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;  // next word in loop
  }

  setTimeout(typeLoop, isDeleting ? 60 : speed);
}

typeLoop();





// =============================
// Glass Popup Logic
// =============================
// =======================
// MULTIPLE GLASS POPUPS
// =======================

// Select all popup buttons
const popupButtons = document.querySelectorAll(".glass-popup-btn");

// Add click event to every button
popupButtons.forEach(button => {
  button.addEventListener("click", () => {
    const popupId = button.getAttribute("data-popup");
    const popup = document.getElementById(popupId);
    if (popup) popup.classList.add("active");
  });
});

// Close buttons
const closeButtons = document.querySelectorAll(".popup-close");

closeButtons.forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const popup = closeBtn.closest(".popup-overlay");
    popup.classList.remove("active");
  });
});

// Close popup when clicking outside box
document.querySelectorAll(".popup-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
});




// =======================
// SLIDING GALLERY
// =======================

(function () {
  const track = document.querySelector(".gallery-track");
  if (!track) return; // safety

  const items = Array.from(track.children);
  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");

  let currentIndex = 0;

  function updateGallery() {
    // Get width of one slide (they all have same min-width)
    const itemWidth = items[0].getBoundingClientRect().width;
    const offset = itemWidth * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function goNext() {
    if (currentIndex < items.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop
    }
    updateGallery();
  }

  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - 1;
    }
    updateGallery();
  }

  if (nextBtn) nextBtn.addEventListener("click", goNext);
  if (prevBtn) prevBtn.addEventListener("click", goPrev);

  // Optional: auto-slide every 5s
  // setInterval(goNext, 5000);

  // Recalculate on resize (for responsive widths)
  window.addEventListener("resize", updateGallery);

  // Initial position
  updateGallery();
})();






// ==============================
// GALLERY PAGE + LIGHTBOX
// ==============================

(function () {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return; // no gallery on this page

  // CONFIG: how many images you have
  const totalImages = 12; // change this to your number
  const basePath = "./assets/images/gallery/";
  const baseName = "gallery-"; // so files are gallery-1.jpg, gallery-2.jpg, ...

  const imageList = [];

  for (let i = 1; i <= totalImages; i++) {
    imageList.push({
      thumb: `${basePath}${baseName}${i}.jpg`,
      full: `${basePath}${baseName}${i}.jpg`
    });
  }

  // Build gallery items
  imageList.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.dataset.index = index;
    item.innerHTML = `
      <img src="${img.thumb}" alt="Ayaschya26 gallery image ${index + 1}">
    `;
    grid.appendChild(item);
  });

  // Lightbox elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-image");
  const btnClose = lightbox.querySelector(".lightbox-close");
  const btnPrev = lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = imageList[currentIndex];
    lightboxImg.src = img.full;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imageList.length;
    lightboxImg.src = imageList[currentIndex].full;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    lightboxImg.src = imageList[currentIndex].full;
  }

  // Click on grid item -> open
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    const index = parseInt(item.dataset.index, 10);
    openLightbox(index);
  });

  // Close button
  btnClose.addEventListener("click", closeLightbox);

  // Outside click closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Arrows
  btnNext.addEventListener("click", showNext);
  btnPrev.addEventListener("click", showPrev);

  // ESC key closes
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
})();







// ==============================
// GALLERY GRID + LIGHTBOX + MEDIUM SLIDER
// ==============================

(function () {
  const grid = document.getElementById("gallery-grid");
  const sliderTrack = document.getElementById("gallery-slider");
  const lightboxEl = document.getElementById("lightbox");

  // If nothing from gallery exists, skip
  if (!grid && !sliderTrack && !lightboxEl) return;

  // CONFIG: how many images are in ./assets/images/gallery/
  const totalImages = 12; // <<< CHANGE THIS TO YOUR COUNT
  const basePath = "./assets/images/gallery/";
  const baseName = "gallery-"; // files: gallery-1.jpg, gallery-2.jpg, ...

  const imageList = [];
  for (let i = 1; i <= totalImages; i++) {
    imageList.push({
      thumb: `${basePath}${baseName}${i}.jpg`,
      full: `${basePath}${baseName}${i}.jpg`,
    });
  }

  let currentIndex = 0;

  // ---------- LIGHTBOX ----------
  function openLightbox(index) {
    if (!lightboxEl) return;
    currentIndex = index;
    const imgEl = lightboxEl.querySelector(".lightbox-image");
    if (!imgEl) return;
    imgEl.src = imageList[currentIndex].full;
    lightboxEl.classList.add("active");
    lightboxEl.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove("active");
    lightboxEl.setAttribute("aria-hidden", "true");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imageList.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    openLightbox(currentIndex);
  }

  if (lightboxEl) {
    const btnClose = lightboxEl.querySelector(".lightbox-close");
    const btnPrev = lightboxEl.querySelector(".lightbox-prev");
    const btnNext = lightboxEl.querySelector(".lightbox-next");

    if (btnClose) btnClose.addEventListener("click", closeLightbox);
    if (btnNext) btnNext.addEventListener("click", (e) => {
      e.stopPropagation();
      showNext();
    });
    if (btnPrev) btnPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrev();
    });

    // Click outside image closes
    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl) closeLightbox();
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (!lightboxEl.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });
  }

  // ---------- BIG GRID ----------
  if (grid) {
    imageList.forEach((img, index) => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.dataset.index = index;
      item.innerHTML = `
        <img src="${img.thumb}" alt="Ayaschya26 gallery image ${index + 1}">
      `;
      grid.appendChild(item);
    });

    grid.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      const idx = parseInt(item.dataset.index, 10);
      openLightbox(idx);
    });
  }

  // ---------- MEDIUM SLIDER ----------
  if (sliderTrack) {
    const thumbWrapper = sliderTrack.parentElement;
    const btnThumbPrev = document.querySelector("[data-thumb-prev]");
    const btnThumbNext = document.querySelector("[data-thumb-next]");

    // Build thumbs
    imageList.forEach((img, index) => {
      const thumb = document.createElement("div");
      thumb.className = "thumb-item";
      thumb.dataset.index = index;
      thumb.innerHTML = `
        <img src="${img.thumb}" alt="Ayaschya26 highlight image ${index + 1}">
      `;
      sliderTrack.appendChild(thumb);
    });

    const thumbItems = Array.from(sliderTrack.children);
    let slideIndex = 0;
    let maxIndex = 0;
    let step = 0;

    function computeSliderMetrics() {
      if (thumbItems.length === 0) return;

      if (thumbItems.length === 1) {
        step = thumbItems[0].getBoundingClientRect().width + 10;
        maxIndex = 0;
        return;
      }

      const firstRect = thumbItems[0].getBoundingClientRect();
      const secondRect = thumbItems[1].getBoundingClientRect();
      step = secondRect.left - firstRect.left; // includes gap

      const wrapperWidth = thumbWrapper.getBoundingClientRect().width;
      const visibleCount = Math.max(1, Math.floor(wrapperWidth / step));
      maxIndex = Math.max(0, thumbItems.length - visibleCount);

      slideIndex = Math.min(slideIndex, maxIndex);
    }

    function updateThumbSlider() {
      sliderTrack.style.transform = `translateX(-${slideIndex * step}px)`;
    }

    function goNextThumb() {
      if (slideIndex < maxIndex) {
        slideIndex++;
      } else {
        slideIndex = 0;
      }
      updateThumbSlider();
    }

    function goPrevThumb() {
      if (slideIndex > 0) {
        slideIndex--;
      } else {
        slideIndex = maxIndex;
      }
      updateThumbSlider();
    }

    computeSliderMetrics();
    updateThumbSlider();
    window.addEventListener("resize", () => {
      computeSliderMetrics();
      updateThumbSlider();
    });

    if (btnThumbNext) btnThumbNext.addEventListener("click", goNextThumb);
    if (btnThumbPrev) btnThumbPrev.addEventListener("click", goPrevThumb);

    // Auto-slide every 4s
    setInterval(goNextThumb, 4000);

    // Clicking on thumb also opens lightbox
    if (lightboxEl) {
      sliderTrack.addEventListener("click", (e) => {
        const thumb = e.target.closest(".thumb-item");
        if (!thumb) return;
        const idx = parseInt(thumb.dataset.index, 10);
        openLightbox(idx);
      });
    }
  }
})();



