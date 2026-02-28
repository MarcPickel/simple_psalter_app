import "./index.css";
import Api from "../utils/api.js";
import Card from "../components/Card.js";
import Modal from "../components/Modal.js";

//Header Variables
const header = document.querySelector(".header");

const headerAboutButton = header.querySelector(".nav__about-button");
const headerContactButton = header.querySelector(".nav__contact-button");

// Selections Variables
const selectionsEl = document.querySelector(".selections");
const getPsalmButton = selectionsEl.querySelector("#psalm-button");
const translationButton = selectionsEl.querySelector("#translation-button");

// Modal Variables
const modal = document.querySelector(".modal");
const kingJamesTransButton = modal.querySelector("#kjv");
const douayRheimsTransButton = modal.querySelector("#dra");
const darbyTransButton = modal.querySelector("#darby");
const americanTransButton = modal.querySelector("#asv");

// Trackers
// Track current psalm data for translation switching
let currentPsalmData = null;
let currentCard = null;
const defaultTranslation = "kjv";
let currentTranslation = defaultTranslation;

// API Instantiation
const api = new Api({
  baseUrl: "https://bible-api.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// About Modal Functionality
const aboutModal = new Modal("#about-modal");
headerAboutButton.addEventListener("click", () => {
  aboutModal.open();
});

// Contact Modal Functionality

const contactModal = new Modal("#contact-modal");
headerContactButton.addEventListener("click", () => {
  contactModal.open();
});

// Translation Modal Functionality
const translationModal = new Modal("#translation-modal");
translationButton.addEventListener("click", () => {
  translationModal.open();
});

// Card and Random Psalm Functionality
const getPsalm = () => {
  api
    .getRandomPsalm(currentTranslation)
    .then((data) => {
      currentPsalmData = data;
      console.log("Current Translation:", data.translation_id);

      if (currentCard) {
        currentCard.remove();
      }

      currentCard = new Card(currentPsalmData, "#card-template");
      const cardEl = currentCard.getCard();

      document.querySelector(".cards").append(cardEl);
    })
    .catch((error) => {
      console.error("Error fetching psalm:", error);
    });
};
getPsalmButton.addEventListener("click", getPsalm);

const handleTransChange = (translationId) => {
  if (!currentPsalmData) {
    console.warn(
      "Ask, and it will be given you; seek, and you will find; knock, and it will be opened to you.",
    );
    return;
  }

  const reference = currentPsalmData.reference;

  api
    .changeTranslation({ reference, translation: translationId })
    .then((data) => {
      currentPsalmData = data;

      if (currentCard) {
        currentCard.remove();
      }

      currentCard = new Card(currentPsalmData, "#card-template");
      const cardEl = currentCard.getCard();

      document.querySelector(".cards").append(cardEl);
    })
    .catch((error) => {
      console.error("Error fetching translation:", error);
    });
};

// Event Listeners

kingJamesTransButton.addEventListener("click", (evt) => {
  handleTransChange("kjv", evt.target.textContent);
  currentTranslation = "kjv";
  translationModal.close();
});

douayRheimsTransButton.addEventListener("click", (evt) => {
  handleTransChange("dra", evt.target.textContent);
  currentTranslation = "dra";
  translationModal.close();
});

darbyTransButton.addEventListener("click", (evt) => {
  handleTransChange("darby", evt.target.textContent);
  currentTranslation = "darby";
  translationModal.close();
});

americanTransButton.addEventListener("click", (evt) => {
  handleTransChange("asv", evt.target.textContent);
  currentTranslation = "asv";
  translationModal.close();
});
