import Route from "../route";

const Details = (function details() {
  const details = document.querySelector("section.details");
  const backButton = details.querySelector(".back-button");

  const addEvents = () => {
    backButton.addEventListener("click", () => {
      Route.transition(null, details, ".home");
    });
  };
  function init() {
    addEvents();
  }

  return {
    init,
  };
})();
export default Details;
