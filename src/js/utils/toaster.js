export const makeToaster = el => (icon, msg, type = "info") => {
  const opts = { once: true };
  const toast = document.createElement("p");
  toast.dataset.icon = icon;
  toast.classList.add("toast", `toast--${type}`);
  toast.innerHTML = msg;

  const onToastIn = () => {
    toast.addEventListener("animationend", toast.remove, opts);
    setTimeout(() => toast.classList.add("is-toasted"), 5000);
  };

  toast.addEventListener("animationend", onToastIn, opts);
  el.appendChild(toast);
};