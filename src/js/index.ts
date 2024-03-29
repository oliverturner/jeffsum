function init() {
  const root = document.querySelector(":root");

  const features = [
    {
      enabled: root && "animate" in root,
      label: "Web Animation API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API",
    },
    {
      enabled: "registerProperty" in CSS,
      label: "CSS Properties & Values API",
      url: "https://houdini.glitch.me/custom-properties",
    },
  ];

  if (features.every((f) => f.enabled)) {
    import("./jeffsum.js")
      .then((module) => module.showJeff())
      .catch((err) => console.log(err));
  } else {
    import("./fallback.js")
      .then((module) => module.showFallback(features))
      .catch((err) => console.log(err));
  }
}

export default init();
