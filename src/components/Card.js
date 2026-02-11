class Card {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._reference = this._data.reference;
    this._changeRef();
    this._saveNum();
    this._verses = this._data.verses;
    this._verse = this._verses.verse;
    this._text = this._verses.text;
    this._translation = this._data.translation_name;
  }

  _changeRef() {
    this._reference.replace("Psalms", "Psalm");
  }

  _saveNum() {
    this._reference.replace("Psalms ", "");
  }

  // Private method to get title

  // Private method to get pretext

  // Private method or some means to have verse paired with line of text

  getCard() {
    this._cardEl = this._templateEl.content
      .querySelector(".card")
      .cloneNode(true);
    const cardPsalmNum = this._cardEl.querySelector(".card__psalm-number");
    const cardTransTextEl = this.cardEl.querySelector(
      ".card__translation-text",
    );
    const cardNum = this._cardEl.querySelector(".card__number");
    const cardTitleEl = this._cardEl.querySelector(".card__title");
    const cardPretextEl = this._cardEl.querySelector(".card__pretext");
    const cardTextEl = this._cardEl.querySelector(".card__text");

    cardPsalmNum.textContent = this._changeRef(this._reference);

    // todoNameEl.textContent = this._data.name;
    //psalm-number.textContent
    //translation-text.textContent
    //number.textContent
    //title.textContent
    //pretext.textContent
    //text.textContent

    return this._cardEl;
  }
}

// reference (e.g. "Psalms 23"), verses (an array), verse number, translation_name

// For an example
/*getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._generateDateEl();
    this._setEventListeners();

    return this._todoElement;
  }*/
