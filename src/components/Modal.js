class Modal {
  constructor({ modalSelector }) {
    this._modalEl = document.querySelector(modalSelector);
    this._modalCloseButton = this._modalEl.querySelector(".modal__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  open() {
    this._modalEl.classList.add(".modal_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._modalEl.classList.remove(".modal_visibile");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setModalEventListeners() {
    this._modalEl.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList(".modal__close") ||
        evt.target.classList(".modal")
      ) {
        this.close();
      }
    });
  }

  _handleEscapeClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}

export default Modal;
