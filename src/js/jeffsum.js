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
const cdn = "https://image.tmdb.org/t/p";

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

root.addEventListener("submit", async e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const n = f.get("paragraphs");

  try {
    const req = await fetch("/img/images.json");
    const json = await req.json();
    const max = json.length;
    const indices = Array.from(
      { length: n },
      () => Math.floor(Math.random() * max)
    );

    gallery.innerHTML = indices
      .map(n => {
        const [alt, url] = json[n];
        const h = Math.floor(Math.random() * 400) + 100;
        return `<img height="${h}" src="${cdn}/w300/${url}" alt="${alt}">`;
      })
      .join("");

    window.location.hash = "main";
  } catch (err) {
    console.error(err);
  }
});
