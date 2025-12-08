import "./index.css";

//Header Variables
const header = document.querySelector(".header");

const headerPsalmButtonEl = header.querySelector(".header__psalm-button");

const headerContent = header.querySelector(".header__content_psalm-trans");
const headerPsalmNumberEl = headerContent.querySelector(".header__text");

const transDropdownEl = headerContent.querySelector(".header__dropdown");

// Main Variables

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Footer Variables
const footer = document.querySelector(".footer");
const footerAboutButton = footer.querySelector(".nav__about-button");
const footerContactButton = footer.querySelector(".nav__contact-button");

// Get Psalm Function
function getPsalm(data) {
  let number = Math.floor(Math.random() * data.length);

  let cardEl = cardTemplate.cloneNode(true);
  let cardTitleEl = cardEl.querySelector(".card__title");
  let cardSubtitleEl = cardEl.querySelector(".card__subtitle");
  let cardPretextEl = cardEl.querySelector(".card__pretext");
  let cardTextEl = cardEl.querySelector(".card__text");

  cardTitleEl.textContent = data[number].title;
  cardSubtitleEl.textContent = data[number].subtitle;
  cardPretextEl.textContent = data[number].pretext;
  cardTextEl.textContent = data[number].text;

  return cardElement;
}
