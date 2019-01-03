const features = [
  [
    "animate",
    document.querySelector(":root"),
    "Web Animation API",
    "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API"
  ],
  [
    "registerProperty",
    CSS,
    "CSS Properties & Values API",
    "https://drafts.css-houdini.org/css-properties-values-api/"
  ],
  [
    "CSSUnitValue",
    window,
    "Typed OM",
    "https://github.com/w3c/css-houdini-drafts/tree/master/css-typed-om"
  ]
].reduce((acc, [prop, obj, label, url]) => {
  const feature = { label, url, enabled: prop in obj };
  return [...acc, feature];
}, []);

if (features.every(f => f.enabled)) {
  import("./jeffsum.js").then(module => module.showJeff());
} else {
  import("./fallback.js").then(module => module.showFallback(features));
}
