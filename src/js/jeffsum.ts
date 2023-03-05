import quotes from "../data/quotes.json";

const els = {
  root: document.querySelector<HTMLHtmlElement>(":root")!,
  hero: document.querySelector<HTMLElement>(".app__header")!,
  form: document.querySelector<HTMLFormElement>("form[name='jeffness']")!,
  quotes: document.querySelector<HTMLDivElement>(
    "[data-component='quotes']"
  )!
};

const jeffs = els.hero.querySelectorAll<HTMLImageElement>("img");
const jeffNum = jeffs.length;

const config = {
  duration: 3000,
  fill: "both",
  easing: "ease-in-out",
} as const;

function switchJeff(currentJeff: HTMLImageElement, nextIndex: number) {
  for (const jeff of jeffs) {
    jeff.style.setProperty("z-index", "0");
  }

  currentJeff.style.setProperty("z-index", "1");
  showJeff(nextIndex);
}

export function showJeff(currentIndex = 0) {
  const jeff = jeffs[currentIndex];
  const { gradientStart, gradientEnd } = jeff.dataset;

  els.root.style.setProperty("--gradientStart", gradientStart!);
  els.root.style.setProperty("--gradientEnd", gradientEnd!);

  jeff.style.setProperty("z-index", "2");
  jeff.animate(
    [
      { opacity: 0, transform: "scale(1.2, 1.2)" },
      { opacity: 1, transform: "scale(1, 1)" },
    ],
    config
  ).onfinish = () => {
    const nextIndex = currentIndex + 1;
    setTimeout(switchJeff, config.duration, jeff, nextIndex % jeffNum);
  };
}

function shuffle(a: string[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

els.form.addEventListener("submit", function (event: SubmitEvent) {
  event.preventDefault();

  const f = new FormData(this);
  const n = f.get("paragraphs");

  console.log(this, n);
});
