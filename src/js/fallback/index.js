import { icons } from "./icons";
import { makeToaster } from "../utils/toaster";

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

const onCopyClick = toaster => {
  const url = "chrome://flags/#enable-experimental-web-platform-features";

  if (!navigator.clipboard) {
    const err = `Can't write to the clipboard. Please manually copy <code>${url}</code>`;
    return toaster("😔", `${err}`, "error");
  }

  navigator.clipboard
    .writeText(url)
    .then(() =>
      toaster("📋", `The link was copied to your clipboard! Now open a new tab...`, "success")
    )
    .catch(err => toaster("😱", `Oh no! ${err}`, "error"));
};

export const showFallback = features => {
  const template = document.querySelector("#template-fallback");
  const node = document.importNode(template.content, true);
  const slot = node.querySelector("[data-slot=features]");
  slot.innerHTML = features.map(getFeature).join("");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.innerHTML = icons;

  const toaster = makeToaster(node.querySelector(".toaster"));

  const copyBtn = node.querySelector("[data-click=copy]");
  copyBtn.addEventListener("click", () => onCopyClick(toaster));

  const body = document.querySelector("body");
  body.appendChild(node);
  body.appendChild(svg);
};
