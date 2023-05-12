// This file set applies certain effects to make certain workarounds like the 100vw full width easier

import { state } from "./state";

export function resetViewportWidth() {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollBarWidth}px`
  );
}
export function debounce(func, timeout = 500) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
export async function fetchCountries(name) {
  const apiRoot = "https://restcountries.com/v3.1";
  const response = await fetch(`${apiRoot}/name/${name}`);
  const data = await response.json();

  return data;
}
const createCountryCard = ({
  flags: { png: flag },
  name: { common: name },
  population,
  region,
  capital,
}) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  const card = document.createElement("div");
  card.classList.add("c-card");
  card.innerHTML = `
          <div class="c-card__image__wrapper">
            <img src=${flag} alt="${name}'s flag">
          </div>
          <div class="c-card__content__wrapper">
            <h2 class="c-card__title">${name}</h2>
            <ul class="c-card__details__wrapper">
              <li class="c-card__detail">
                <span class="name">Population:</span>
                <span class="content">${formatNumber(population)}</span>
              </li>
              <li class="c-card__detail">
                <span class="name">Region:</span>
                <span class="content">${region}</span>
              </li>
              <li class="c-card__detail">
                <span class="name">Capital:</span>
                <span class="content">${capital}</span>
              </li>
            </ul>
          </div>`;
  return card;
};
export const generateDetails = (country) => {
  const detailsWrapper = document.querySelector(".details__wrapper");
  detailsWrapper.innerHTML = `
<div class="details__grid-wrapper">
    <div class="details__image">
        <img src=${country.flags.png} alt="${country.flags.alt}" />
    </div>
    <div class="details__content">
        <h2 class="details__title">
            ${country.name.common}
        </h2>
        <ul class="details__list">
            <li class="details__item details__item--left">
                <span class="name">Native Name:</span>
                <span class="content">
                    ${country.altSpellings.slice(-1)}
                </span>
            </li>
            <li class="details__item details__item--right">
                <span class="name">Currencies:</span>
                <span class="content">
                    ${
                      Object.values(
                        country.currencies[Object.keys(country.currencies)]
                      )[0]
                    }
                </span>
            </li>
            <li class="details__item details__item--more">
                <span class="name">Border countries:</span>
                <ul class="details__item__list">
                    ${country.borders
                      .map(
                        (border) => `
                    <li>${border}</li>
                    `
                      )
                      .join("")}
                </ul>
            </li>
        </ul>
    </div>
</div>`;
};

export function render() {
  const cardGallery = document.querySelector(".card-gallery__wrapper");
  const galleryFragment = document.createDocumentFragment();
  const countries = state.countries;
  countries.forEach((country) => {
    galleryFragment.appendChild(createCountryCard(country));
  });
  cardGallery.innerHTML = "";
  cardGallery.append(galleryFragment);
}

export const getCountryFromState = (countryName) =>
  state.countries.filter((country) => country.name.common === countryName);
