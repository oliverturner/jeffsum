const features = [
  {
    enabled: "animate" in document.querySelector(":root"),
    label: "Web Animation API",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API"
  },
  {
    enabled: "registerProperty" in CSS,
    label: "CSS Properties & Values API",
    url: "https://drafts.css-houdini.org/css-properties-values-api/"
  },
  {
    enabled: "CSSUnitValue" in window,
    label: "Typed OM",
    url: "https://github.com/w3c/css-houdini-drafts/tree/master/css-typed-om"
  }
];

if (features.every(f => f.enabled)) {
  import("./jeffsum.js").then(module => module.showJeff());
} else {
  import("./fallback.js").then(module => module.showFallback(features));
}
