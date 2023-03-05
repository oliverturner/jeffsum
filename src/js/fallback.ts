import { makeToaster } from "./utils/toaster.js";

const icons = `
<symbol id="icon-supported" viewBox="0 0 1024 1024">
  <path
    d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"
  />
</symbol>
<symbol id="icon-unsupported" viewBox="0 0 1024 1024">
  <path
    d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"
  />
</symbol>
`;

const getFeature = ({ url, label, enabled }) => {
  const icon = enabled ? "#icon-supported" : "#icon-unsupported";
  const cls = enabled
    ? "feature__icon"
    : "feature__icon feature__icon--unsupported";

  return `
    <li class="feature">
      <span class="${cls}">
        <svg><use xlink:href="${icon}"></use></svg>
      </span>
      <a class="feature__link" href="${url}">${label}</a>
    </li>
  `;
};

const onCopyClick = async (toaster) => {
  const url = "chrome://flags/#enable-experimental-web-platform-features";

  if (!navigator.clipboard) {
    const err = `Can't write to the clipboard. Please manually copy <code>${url}</code>`;
    return toaster("😔", `${err}`, "error");
  }

  try {
    await navigator.clipboard.writeText(url);
    toaster("📋", `Link copied to clipboard! Now on to step 2...`, "success");
  } catch (err) {
    toaster("😱", `Oh no! ${err}`, "error");
  }
};

/**
 * @param {{ url: any; label: any; enabled: any; }[]} features
 */
export const showFallback = (features) => {
  const template =
    document.querySelector<HTMLTemplateElement>("#template-fallback")!;
  const node = document.importNode(template.content, true);
  const slot = node.querySelector("[data-slot=features]")!;
  slot.innerHTML = features.map(getFeature).join("");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.innerHTML = icons;

  const toaster = makeToaster(node.querySelector(".toaster"));

  const copyBtn = node.querySelector("[data-click=copy]")!;
  copyBtn.addEventListener("click", () => onCopyClick(toaster));

  const body = document.querySelector("body")!;
  body.appendChild(node);
  body.appendChild(svg);
};
