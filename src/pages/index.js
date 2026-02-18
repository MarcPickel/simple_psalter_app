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
const defaultTransId = "#kjv";
let currentTransId = "";

// API Instantiation
const api = new Api({
  baseUrl: "https://bible-api.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Change this to handleAboutModal -- have it open About Modal
function handleAboutModal() {
  // Clear current psalm data since this isn't a psalm
  currentPsalmData = null;
  const cardEl = getCardEl(aboutCard);
  cardContainer.replaceChildren(cardEl);
}

// Change this to handleContactModal -- have it open Contact Modal
function handleContactModal() {
  // Clear current psalm data since this isn't a psalm
  currentPsalmData = null;
  const cardEl = getCardEl(contactCard);
  cardContainer.replaceChildren(cardEl);
}

// Card and Random Psalm Functionality
const getPsalm = () => {
  api
    .getRandomPsalm()
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
      console.error("Error fetching psalm:", error);
    });
};

getPsalmButton.addEventListener("click", getPsalm);

// Modal Functionality
const translationModal = new Modal("#translation-modal");
translationButton.addEventListener("click", () => {
  translationModal.open();
});

// Change to, instead of the button's text, just the text atop the card
function handleTextTransChange(transText) {
  transTextEl.textContent = transText;
}

const handleTransChange = (translationId, transText) => {
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

      const cardEl = currentCard.getCard();
      currentCard = new Card(currentPsalmData, "#card-template");

      document.querySelector(".cards").append(cardEl);
    })
    .catch((error) => {
      console.error("Error fetching translation:", error);
    });
};

// Change Translation Function
function oldHandleTransChange(translationId, buttonText) {
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

// Event Listeners

kingJamesTransButton.addEventListener("click", (evt) => {
  handleTransChange("kjv", evt.target.textContent);
});

douayRheimsTransButton.addEventListener("click", (evt) => {
  handleTransChange("dra", evt.target.textContent);
});

darbyTransButton.addEventListener("click", (evt) => {
  handleTransChange("darby", evt.target.textContent);
});

americanTransButton.addEventListener("click", (evt) => {
  handleTransChange("asv", evt.target.textContent);
});
