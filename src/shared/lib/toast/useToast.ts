export const showToast = (message: string) => {
  const el = document.createElement("div");

  el.innerText = message;
  el.style.position = "fixed";
  el.style.top = "170px";
  el.style.right = "240px";
  el.style.background = "#32e540ea";
  el.style.color =  "#fff";
  el.style.padding = "10px 16px";
  el.style.borderRadius = "8px";
  el.style.zIndex = "9999";

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 2000);
};
