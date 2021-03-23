// location.reload(true)
window.addEventListener("pageshow", function (event) {
  let historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    window.location.reload();
  }
});
const body = document.querySelector("body");

// header items

const biernatLetter = document.querySelectorAll("#biernat");
const navButton = document.querySelector("#nav_button");
const header = document.querySelector("#header");
const headerNav = document.querySelector("#header_nav");
const headerLogo = document.querySelector("#header_logo");
const logoSvg = document.querySelector("#logo");
const navList = document.querySelector("#nav_list");
const navItems = document.querySelectorAll("#nav_item");
const centerLineButton = document.querySelector(".nav_burger:nth-child(2)");

let burgerElem = [
  navButton,
  header,
  headerNav,
  headerLogo,
  logoSvg,
  body,
  navList,
];

// burger Animation witch inside menu animation, all element

function burgerAnimation() {
  burgerElem.forEach((elem) => elem.classList.toggle("--active"));

  for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.toggle("--active");
  }
}

function linkScroll() {
  burgerElem.forEach((elem) => elem.classList.remove("--active"));
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove("--active");
  }
}

// fade in effect scroll, sticki menu and logo effect

const lines = [...document.querySelectorAll("#services")];

function fadeInAnimation() {
  if (window.scrollY > 0) {
    header.classList.add("--active_scroll");
    headerLogo.classList.add("--active_scroll");
    logoSvg.classList.add("--active_scroll");
  } else if (window.scrollY <= 0) {
    header.classList.remove("--active_scroll");
    headerLogo.classList.remove("--active_scroll");
    logoSvg.classList.remove("--active_scroll");
  }

  for (let i = 0; i < lines.length; i++) {
    let elem = lines[i];
    let elemHeight = lines[i].offsetHeight;
    let distElem =
      elem.getBoundingClientRect().top - window.innerHeight + elemHeight / 4;
    let distInView =
      elem.getBoundingClientRect().top - window.innerHeight + elemHeight;
    if (distElem < 0) {
      elem.classList.add("--showElem");
    } else {
      elem.classList.remove("--showElem");
    }
    if (distInView < 0) {
      elem.classList.add("--fadeActive");
    } else {
      elem.classList.remove("--fadeActive");
    }
  }
}

window.addEventListener("scroll", fadeInAnimation);
navButton.addEventListener("click", burgerAnimation);

// slider elements and functions

//slider elements
const sliderCarousel = document.querySelector("#slider_carousel");
const mainSlider = document.querySelector("#main_slider");
const buttonNext = document.querySelector("#slider_next");
const buttonPrev = document.querySelector("#slider_prev");
const caroselSlide = [...document.querySelectorAll(".slider_nav a")];

function slider() {
  mainSlider.style.justifyContent = "flex-start";
  sliderCarousel.style.transform = "translate(-100%)";

  changeSlide();
  timeChange = setTimeout(slider, 9000);
}

function changeSlide() {
  let firstSlide = document.querySelector(".carousel_slide:first-child");
  let lastSlide = document.querySelector(".carousel_slide:last-child");

  firstSlide.classList.remove("--active");
  lastSlide.classList.add("--active");
  caroselSlide.forEach((element) => element.classList.toggle("--active"));
}

sliderCarousel.addEventListener(
  "transitionend",
  function () {
    sliderCarousel.appendChild(sliderCarousel.firstElementChild);
    sliderCarousel.style.transition = "none";
    sliderCarousel.style.transform = "translate(0)";

    setTimeout(function () {
      sliderCarousel.style.transition = "all 0.5s ease-in-out";
    });
  },
  false
);

// buttons functions
function next() {
  clearTimeout(timeChange);
  slider();
}

function prev() {
  clearTimeout(timeChange);
  slider();
}

function getTouches(e) {
  return e.touches;
}

function handleTouchStart(e) {
  const firstTouch = getTouches(e)[0];
  yUp = firstTouch.clientY;
}

function handleTouchMove(e) {
  if (!yUp || window.innerWidth > 1024) {
    return;
  }

  let yDown = e.touches[0].clientY;
  let yDiff = yDown - yUp;

  yDiff < 0
    ? burgerElem.forEach((elem) => {
        elem.classList.remove("--active");
        for (let i = 0; i < navItems.length; i++) {
          navItems[i].classList.remove("--active");
        }
      })
    : burgerElem.forEach((elem) => {
        elem.classList.add("--active");
        for (let i = 0; i < navItems.length; i++) {
          navItems[i].classList.add("--active");
        }
      });
}

function sliderTouchStart(e) {
  const firstTouch = getTouches(e)[0];
  xRight = firstTouch.clientX;
}

function sliderTouchMove(e) {
  if (!xRight || window.innerWidth > 1024) {
    return;
  }

  let xLeft = e.touches[0].clientX;
  let xDiff = xLeft - xRight;

  if (xDiff < 0) slider();
  clearTimeout(timeChange);
}

buttonNext.addEventListener("click", next);
buttonPrev.addEventListener("click", prev);

mainSlider.addEventListener("touchstart", sliderTouchStart, false);
mainSlider.addEventListener("touchmove", sliderTouchMove, false);
header.addEventListener("touchstart", handleTouchStart, false);
header.addEventListener("touchmove", handleTouchMove, false);
navItems.forEach((elem) => elem.addEventListener("click", linkScroll));
slider();

console.log('jakub2')
console.log("michal2");