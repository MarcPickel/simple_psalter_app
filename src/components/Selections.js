class Selections {
  constructor({ selector }) {
    this._selectionsEl = document.querySelector(selector);
    this._getPsalmButton = this._selectionsEl.querySelector(
      ".selections__button_psalm",
    );
    this._translationButton = this._selectionsEl.querySelector(
      ".selections__button_translation",
    );
  }
}

export default Selections;
