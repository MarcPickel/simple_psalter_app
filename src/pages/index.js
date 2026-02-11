import "./index.css";
import Api from "../utils/api";

import { welcomeCard, aboutCard, contactCard } from "../utils/constants";

//Header Variables
const header = document.querySelector(".header");

const headerPsalmButtonEl = header.querySelector(".header__psalm-button");

const headerContent = header.querySelector(".header__content_psalm-trans");
const headerPsalmNumberEl = headerContent.querySelector(".header__text");

const transDropdownEl = headerContent.querySelector(".header__dropdown");
const transTextEl = transDropdownEl.querySelector(".header__trans-text");
const kingJamesTransEl = transDropdownEl.querySelector("#kjv");
const douayRheimsTransEl = transDropdownEl.querySelector("#dra");
const darbyTransEl = transDropdownEl.querySelector("#darby");
const americanTransEl = transDropdownEl.querySelector("#asv");

// Main Variables

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardContainer = document.querySelector(".cards");

// Track current psalm data for translation switching
let currentPsalmData = null;

// Footer Variables
const footer = document.querySelector(".footer");
const footerAboutButton = footer.querySelector(".nav__about-button");
const footerContactButton = footer.querySelector(".nav__contact-button");

// API Instantiation

const api = new Api({
  baseUrl: "https://bible-api.com",
  headers: {
    "Content-Type": "application/json",
  },
});

//Handlers

function handleNewCard() {
  api
    .getRandomPsalm()
    .then((data) => {
      console.log("Success:", data);
      // Store the current psalm data so we can switch translations later
      currentPsalmData = data;
      // Here is where I will switch this method with the getCard method
      // from the Card Class.
      const cardEl = getCardEl(data);
      cardContainer.replaceChildren(cardEl);
    })
    .catch((error) => {
      console.error("Error fetching psalm:", error);
    });
}

// I won't need this function any more -- getting rid of Welcome Card
/*function handleWelcomeCard() {
  // Clear current psalm data since this isn't a psalm
  currentPsalmData = null;
  const cardEl = getCardEl(welcomeCard);
  cardContainer.replaceChildren(cardEl);
}*/

// Change this to handleAboutModal -- have it open About Modal
function handleAboutCard() {
  // Clear current psalm data since this isn't a psalm
  currentPsalmData = null;
  const cardEl = getCardEl(aboutCard);
  cardContainer.replaceChildren(cardEl);
}

// Change this to handleContactModal -- have it open Contact Modal
function handleContactCard() {
  // Clear current psalm data since this isn't a psalm
  currentPsalmData = null;
  const cardEl = getCardEl(contactCard);
  cardContainer.replaceChildren(cardEl);
}

function handleTextChange(data) {
  headerPsalmNumberEl.textContent = data.reference;
}

// Change to, instead of the button's text, just the text atop the card
function handleTextTransChange(buttonText) {
  transTextEl.textContent = buttonText;
}

// Change Translation Function
function handleTransChange(translationId, buttonText) {
  if (!currentPsalmData) {
    console.warn("No psalm loaded. Please get a psalm first.");
    return;
  }

  const reference = currentPsalmData.reference;

  api
    .changeTranslation({ reference, translation: translationId })
    .then((data) => {
      currentPsalmData = data;
      const cardEl = getCardEl(data);
      cardContainer.replaceChildren(cardEl);

      handleTextTransChange(buttonText);
    })
    .catch((error) => {
      console.error("Error fetching translation:", error);
    });
}

// Get Card El Function
function getCardEl(data) {
  let cardEl = cardTemplate.cloneNode(true);
  let cardTitleEl = cardEl.querySelector(".card__title");
  let cardSubtitleEl = cardEl.querySelector(".card__subtitle");
  let cardPretextEl = cardEl.querySelector(".card__pretext");
  let cardTextEl = cardEl.querySelector(".card__text");

  cardTitleEl.textContent = data.reference;
  cardSubtitleEl.textContent = data.subtitle;
  cardPretextEl.textContent = data.pretext;
  cardTextEl.textContent = data.text;

  handleTextChange(data);

  return cardEl;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  handleWelcomeCard();
});

headerPsalmButtonEl.addEventListener("click", () => {
  handleNewCard();
});

footerAboutButton.addEventListener("click", () => {
  handleAboutCard();
});

footerContactButton.addEventListener("click", () => {
  handleContactCard();
});

kingJamesTransEl.addEventListener("click", (evt) => {
  handleTransChange("kjv", evt.target.textContent);
});

douayRheimsTransEl.addEventListener("click", (evt) => {
  handleTransChange("dra", evt.target.textContent);
});

darbyTransEl.addEventListener("click", (evt) => {
  handleTransChange("darby", evt.target.textContent);
});

americanTransEl.addEventListener("click", (evt) => {
  handleTransChange("asv", evt.target.textContent);
});
