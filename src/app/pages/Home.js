import gsap from "gsap";
import {
  debounce,
  fetchCountries,
  generateDetails,
  getCountryFromState,
  render,
} from "../utils";
import { updateState } from "../state";

/***** THEMING *****/

// Manual
// User Input
const Home = (function home() {
  const wrapper = document.querySelector("section.home");
  const input = wrapper.querySelector("input[name=country]");
  const filterMenu = wrapper.querySelector(".c-filter-menu");
  const cardGallery = wrapper.querySelector(".card-gallery");

  function addEvents() {
    // User Input
    const handleChange = debounce(() => {
      if (input.value) {
        fetchCountries(input.value)
          .then((data = []) => {
            updateState({
              countries: data,
            });
            render();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, 500);
    input.addEventListener("keyup", handleChange);

    filterMenu.addEventListener("click", (e) => {
      const target = e.target;

      if (target.closest("button")) {
        const { state: filterMenuState } = filterMenu.dataset;
        filterMenu.setAttribute(
          "data-state",
          `${filterMenuState === "closed" ? "open" : "closed"}`
        );
      }
      if (target.closest("li")) {
        const filterType = e.target.textContent;
        filterMenu.setAttribute("data-filter-type", filterType);
        filterMenu.setAttribute("data-state", "closed");
      }
    });

    cardGallery.addEventListener("click", (e) => {
      if (e.target.closest(".c-card")) {
        const card = e.target.closest(".c-card");
        const cardTitle = card.querySelector(".c-card__title").textContent;

        const [country] = getCountryFromState(cardTitle);
        console.log(country);
        generateDetails(country);
        gsap
          .timeline()
          .add(() => {
            wrapper.classList.remove("active");
          })
          .add(() => {
            wrapper.nextElementSibling.classList.add("active");
          });
      }
    });
  }

  function init() {
    addEvents();
  }
  return {
    init,
  };
})();

export default Home;
