class Card {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._reference = this._data.reference;
    this._changeRef();
    this._saveNum();
    this._joinVerseAndText();
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

  _joinVerseAndText() {
    let verses = {};

    for (let i = 0; i < this._verses.length; i++) {
      verses = this._verse + this._text;
    }

    return verses;
  }

  // Private method to get title

  // Private method to get pretext

  // Private method or some means to have verse paired with line of text

  getCard() {
    this._cardEl = this._templateEl.content
      .querySelector(".card")
      .cloneNode(true);
    const cardPsalmNum = this._cardEl.querySelector(".card__psalm-number");
    const cardTransTextEl = this._cardEl.querySelector(
      ".card__translation-text",
    );
    const cardNum = this._cardEl.querySelector(".card__number");
    const cardTextEl = this._cardEl.querySelector(".card__text");

    cardPsalmNum.textContent = this._changeRef(this._reference);
    cardTransTextEl.textContent = this._translation;
    cardNum = this._saveNum(this._reference);
    cardTextEl.textContent = this._joinVerseAndText(this._verses);

    return this._cardEl;
  }
}

export default Card;
