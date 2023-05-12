import Lenis from "@studio-freight/lenis";
import Home from "./pages/Home";
import Details from "./pages/Details";
import "/src/styles/style.scss";

class App {
  constructor() {
    this.themeToggler = document.querySelector(".c-theme-toggler");
  }

  initLenis = () => {
    const wrapper = document.querySelector(".card-gallery");
    const content = document.querySelector(".card-gallery__wrapper");
    const lenis = new Lenis({
      wrapper,
      content,
      lerp: 0.1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  };

  addEvents() {
    //Automatic theming
    let isDarkTheme = window.matchMedia("(prefers-color-scheme:dark)");
    const themeTogglerIcon = this.themeToggler.querySelector(
      ".c-theme-toggler__icon"
    );
    const themeTogglerMode = this.themeToggler.querySelector(
      ".c-theme-toggler__mode"
    );
    if (isDarkTheme.matches) {
      document.body.setAttribute("data-theme", "dark");
      themeTogglerIcon.textContent = "light_mode";
      themeTogglerMode.textContent = "Light Mode";
    } else {
      document.body.setAttribute("data-theme", "light");
      themeTogglerIcon.textContent = "dark_mode";
      themeTogglerMode.textContent = "Dark Mode";
    }
    isDarkTheme.addListener(() => {
      if (isDarkTheme.matches) {
        document.body.setAttribute("data-theme", "dark");
        themeTogglerIcon.textContent = "light_mode";
        themeTogglerMode.textContent = "Light Mode";
      } else {
        document.body.setAttribute("data-theme", "light");
        themeTogglerIcon.textContent = "dark_mode";
        themeTogglerMode.textContent = "Dark Mode";
      }
    });
    this.themeToggler.addEventListener("click", () => {
      const { theme } = document.body.dataset;
      const themeTogglerIcon = this.themeToggler.querySelector(
        ".c-theme-toggler__icon"
      );
      const themeTogglerMode = this.themeToggler.querySelector(
        ".c-theme-toggler__mode"
      );

      if (theme === "light") {
        document.body.setAttribute("data-theme", "dark");
        themeTogglerIcon.textContent = "light_mode";
        themeTogglerMode.textContent = "Light Mode";
      } else {
        document.body.setAttribute("data-theme", "light");
        themeTogglerIcon.textContent = "dark_mode";
        themeTogglerMode.textContent = "Dark Mode";
      }
    });
  }

  init() {
    this.initLenis();
    this.addEvents();
    Home.init();
    Details.init();
  }
}

new App().init();
