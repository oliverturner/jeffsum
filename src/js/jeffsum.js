CSS.registerProperty({
  name: "--gradientStart",
  syntax: "<color>",
  initialValue: "#61BFD9",
  inherits: true
});
CSS.registerProperty({
  name: "--gradientEnd",
  syntax: "<color>",
  initialValue: "#0551B4",
  inherits: true
});

const root = document.querySelector(":root");
const hero = document.querySelector(".app__header");
const jeffs = [...hero.querySelectorAll("img")];
const jeffNum = jeffs.length;

const config = {
  duration: 3000,
  fill: "both",
  easing: "ease-in-out"
};

const switchJeff = (currentJeff, nextIndex) => {
  jeffs.forEach(j => (j.style.zIndex = 0));
  currentJeff.style.zIndex = 1;
  showJeff(nextIndex);
};

export const showJeff = (currentIndex = 0) => {
  const jeff = jeffs[currentIndex];
  const { gradientStart, gradientEnd } = jeff.dataset;

  root.style.setProperty("--gradientStart", gradientStart);
  root.style.setProperty("--gradientEnd", gradientEnd);

  jeff.style.zIndex = 2;
  jeff.animate(
    [
      { opacity: 0, transform: "scale(1.2, 1.2)" },
      { opacity: 1, transform: "scale(1, 1)" }
    ],
    config
  ).onfinish = () => {
    const nextIndex = currentIndex + 1;
    setTimeout(switchJeff, config.duration, jeff, nextIndex % jeffNum);
  };
};

root.addEventListener("submit", e => {
  e.preventDefault();
  window.location.hash = "acknowledgements";
});
