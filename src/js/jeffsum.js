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

CSS.layoutWorklet?.addModule("/js/worklets/masonry.js");

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

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

root.addEventListener("submit", async e => {
  e.preventDefault();

  const f = new FormData(e.target);
  const n = f.get("paragraphs");

  try {
    const req = await fetch("/img/images.json");
    const json = await req.json();
    const max = json.length;
    const indices = shuffle(Array.from({ length: max }, (_, i) => i)).slice(
      0,
      n
    );

    gallery.innerHTML = indices
      .map((idx, i) => {
        const [alt, url] = json[idx];
        const widths = ["w200", "w300"];
        return `<img src="${cdn}/${widths[i % 2]}/${url}" alt="${alt}">`;
      })
      .join("");

    window.location.hash = "main";
  } catch (err) {
    console.error(err);
  }
});
