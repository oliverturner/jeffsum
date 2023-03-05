import quotes from "../data/quotes.json";

const els = {
  root: document.querySelector<HTMLHtmlElement>(":root")!,
  hero: document.querySelector<HTMLElement>(".app__header")!,
  form: document.querySelector<HTMLFormElement>("form[name='jeffness']")!,
  quotes: document.querySelector<HTMLDivElement>("[data-component='quotes']")!,
};

const jeffs = els.hero.querySelectorAll<HTMLImageElement>("img");
const jeffNum = jeffs.length;

const ANIM_PROPS = [
  { opacity: 0, transform: "scale(1.2, 1.2)" },
  { opacity: 1, transform: "scale(1, 1)" },
];
const ANIM_CONFIG = {
  duration: 3000,
  fill: "both",
  easing: "ease-in-out",
} as const;

function switchJeff(props: {
  currentJeff: HTMLImageElement;
  nextIndex: number;
}) {
  for (const jeff of jeffs) {
    jeff.style.setProperty("z-index", "0");
  }

  props.currentJeff.style.setProperty("z-index", "1");
  showJeff(props.nextIndex);
}

export function showJeff(index = 0) {
  const currentJeff = jeffs[index % jeffNum];
  const { gradientStart, gradientEnd } = currentJeff.dataset;

  els.root.style.setProperty("--gradientStart", gradientStart!);
  els.root.style.setProperty("--gradientEnd", gradientEnd!);

  currentJeff.style.setProperty("z-index", "2");
  currentJeff.animate(ANIM_PROPS, ANIM_CONFIG).onfinish = () => {
    setTimeout(switchJeff, ANIM_CONFIG.duration, {
      currentJeff,
      nextIndex: index + 1,
    });
  };
}

function shuffle(a: string[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function getParas(num: number) {
  const paras: string[] = [];
  const numSentences = Math.floor(Math.random() * 5) + 2;

  for (let i = 0; i < num; i++) {
    const str = shuffle(quotes).slice(0, numSentences).join(" ");
    paras.push(`<p>${str}</p>`);
  }

  return paras;
}

els.form.addEventListener("submit", function (event: SubmitEvent) {
  event.preventDefault();

  const f = new FormData(this);
  const n = parseInt(String(f.get("paragraphs")) || "5", 10);

  els.quotes.innerHTML = getParas(n).join("");
});
