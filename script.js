"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay2.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay2.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay2.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Button Scrolling

btnScrollTo.addEventListener("click", (e) => {
  // New school way of doing scroll
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // matching strategy

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tab Component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard claus
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation

const handlerHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handlerHover.bind(0.5));

nav.addEventListener("mouseout", handlerHover.bind(1));

const header = document.querySelector(".header");
const navHeigh = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeigh}px`,
});
headerObserver.observe(header);

// Reveal SEction
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // Guard Claus
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading img
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  // Guard Claus
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  // stop observer
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTarget.forEach((img) => imgObserver.observe(img));

//Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");

  const dotsContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button> `
      );
    });
  };
  createDots();

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  activateDot(0);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);

  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

const HumIcon = document.querySelector(".hamburger-icon");
const PhoneNav = document.querySelector(".phone-nav");
const links = document.querySelectorAll(".phone__nav-item");

const phoneNavContainer = document.querySelector(".phone-nav--container");
// const main = document.querySelector("");

// Phone menu
const closePhoneNav = function () {
  overlay.classList.add("hidden");
  PhoneNav.style.left = "-100%";
  HumIcon.classList.remove("open");
  document.querySelector("body").classList.remove("overflow");
};

// const overlay = document.querySelector(".overlay");
phoneNavContainer.addEventListener("click", (e) => {
  const clicked = e.target;

  if (
    clicked.classList.contains("hamburger-icon") ||
    clicked.classList.contains("bar-1") ||
    clicked.classList.contains("bar-2") ||
    clicked.classList.contains("bar-3")
  ) {
    PhoneNav.style.left = "0";
    HumIcon.classList.toggle("open");
    overlay.classList.toggle("hidden");
    document.querySelector("body").classList.toggle("overflow");
    if (!HumIcon.classList.contains("open")) {
      PhoneNav.style.left = "-100%";
    }
  }

  // overlay clicked
  if (clicked.classList.contains("overlay")) {
    closePhoneNav();
  }
});

document
  .querySelector(".phone__nav--links")
  .addEventListener("click", function (e) {
    const clicked = e.target;
    if (clicked.parentElement.classList.contains("phone__nav-item")) {
      closePhoneNav();
    }

    if (clicked.classList.contains("open__account--btn")) {
      closePhoneNav();
      overlay.classList.add("hidden");
      overlay2.classList.remove("hidden");
      modal.classList.remove("hidden");
    }
  });
