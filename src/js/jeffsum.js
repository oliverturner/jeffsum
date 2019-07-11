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

CSS.layoutWorklet.addModule("/js/worklets/masonry.js");

const root = document.querySelector(":root");
const hero = document.querySelector(".app__header");
const gallery = document.querySelector(".main__gallery");
const jeffs = [...hero.querySelectorAll("img")];
const jeffNum = jeffs.length;

const config = {
  duration: 3000,
  fill: "both",
  easing: "ease-in-out"
};

const switchJeff = (currentJeff, nextIndex) => {
  jeffs.forEach(j => j.attributeStyleMap.set("z-index", 0));
  currentJeff.attributeStyleMap.set("z-index", 1);
  showJeff(nextIndex);
};

export const showJeff = (currentIndex = 0) => {
  const jeff = jeffs[currentIndex];
  const { gradientStart, gradientEnd } = jeff.dataset;

  root.attributeStyleMap.set("--gradientStart", gradientStart);
  root.attributeStyleMap.set("--gradientEnd", gradientEnd);

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

const html = `
  <img src="https://source.unsplash.com/user/erondu/300x200" alt="random">
  <img src="https://source.unsplash.com/user/jabari21/350x250" alt="random">
  <img src="https://source.unsplash.com/user/angelsvicente/400x300" alt="random">
  <img src="https://source.unsplash.com/user/trevcole/400x400" alt="random">
  <img src="https://source.unsplash.com/user/krivitskiy/450x350" alt="random">
  <img src="https://source.unsplash.com/user/zulmaury/300x300" alt="random">
  <img src="https://source.unsplash.com/user/eyeforebony/350x200" alt="random">
  <img src="https://source.unsplash.com/user/cristian_newman/400x300" alt="random">
  <img src="https://source.unsplash.com/user/vale_zmeykov/300x400" alt="random">
  <img src="https://source.unsplash.com/user/helloimnik/450x200" alt="random">
`;

root.addEventListener("submit", e => {
  e.preventDefault();
  gallery.innerHTML = html;
  window.location.hash = "main";
});
