class Modal {
  constructor(modalSelector) {
    this._modalEl = document.querySelector(modalSelector);
    this._modalCloseButton = this._modalEl.querySelector(".modal__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this.setEventListeners();
  }

  open() {
    this._modalEl.classList.add("modal_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._modalEl.classList.remove("modal_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._modalEl.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal__close") ||
        evt.target.classList.contains("modal")
      ) {
        this.close();
      }
    });
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}

export default Modal;
