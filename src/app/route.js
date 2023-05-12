const Route = (function route() {
  const show = (page) => {
    document.querySelector(page).classList.add("active");
  };
  const hide = (page) => {
    page.classList.remove("active");
  };
  const transition = (callback, from, to) => {
    if (callback) callback.apply(this, ...args);
    hide(from);
    show(to);
  };
  return {
    transition,
  };
})();

export default Route;
