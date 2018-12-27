const root = document.querySelector(":root");
const hero = document.querySelector(".app__header");
const jeffs = [...hero.querySelectorAll("img")];
const jeffClasses = Array.from({ length: jeffs.length }, (_, i) => "jeff" + i);

const config = {
  duration: 3000,
  fill: "both",
  easing: "ease-in-out"
};

const updateLayers = jeff => {
  jeffs.forEach(j => (j.style.zIndex = 0));
  jeff.style.zIndex = 1;
};

const switchJeff = (jeff, nextIndex) => () => {
  root.classList.remove(...jeffClasses);
  root.classList.add("jeff" + nextIndex);
  updateLayers(jeff);
  showJeff(nextIndex);
};

const showJeff = (nextIndex = 0) => {
  const jeff = jeffs[nextIndex];
  jeff.style.zIndex = 2;

  jeff.animate(
    [
      { opacity: 0, transform: "scale(1.2, 1.2)" },
      { opacity: 1, transform: "scale(1, 1)" }
    ],
    config
  ).onfinish = () => {
    setTimeout(switchJeff(jeff, ++nextIndex % 3), config.duration);
  };
};

const acknowledge = e => {
  e.preventDefault();
  window.location.hash = "acknowledgements";
};

root.addEventListener("submit", acknowledge);

showJeff();
