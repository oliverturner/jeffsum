

export default (features) => {
  const t = document.querySelector("#template-warning");
  const clone = document.importNode(t.content, true);
  const list = clone.querySelector(".warning__features");

  features.forEach(f => {
    const s = f.enabled ? "#template-feature" : "#template-feature-unsupported";

    const template = document.querySelector(s);
    const item = document.importNode(template.content, true);
    const link = item.querySelector(".feature__label");

    link.href = f.url;
    link.textContent = f.label;
    list.appendChild(item);
  });

  document.querySelector(":root").classList.add("no-support");
  document.querySelector("body").appendChild(clone);
};
