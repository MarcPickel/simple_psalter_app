class Card {
  constructor(data, selector) {
    this._data = data;
    this._templateEl = document.querySelector(selector);
    this._reference = this._data.reference;
    this._verses = this._data.verses;
    this._translation = this._data.translation_name;

    this._reference = this._reference.replace("Psalms", "Psalm");
    this._cardNum = this._reference.replace("Psalm", "");
  }

  _joinVerseAndText() {
    let combined = [];

    for (let i = 0; i < this._verses.length; i++) {
      let verseNum = this._verses[i].verse;
      let verseText = this._verses[i].text;
      combined.push(`${verseNum} ${verseText}`);
    }

    return combined.join("");
  }

  remove() {
    if (this._cardEl) {
      this._cardEl.remove();
    }
  }

  getCard() {
    this._cardEl = this._templateEl.content
      .querySelector(".card")
      .cloneNode(true);
    let cardPsalmNum = this._cardEl.querySelector(".card__psalm-number");
    let cardTransTextEl = this._cardEl.querySelector(".card__translation-text");
    let cardNum = this._cardEl.querySelector(".card__number");
    let cardTextEl = this._cardEl.querySelector(".card__text");

    cardPsalmNum.textContent = this._reference;
    cardTransTextEl.textContent = this._translation;
    cardNum = this._cardNum;
    cardTextEl.textContent = this._joinVerseAndText();

    return this._cardEl;
  }

  renderTrans() {}
}

export default Card;
