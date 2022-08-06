import Popup from "../components/Popup.js";

export default class PopupWithAccept extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitForm = submitForm;
  }
  
  open(card) {
    super.open();
    this._card = card;
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
        e.preventDefault();
        this._submitForm(this._card);
    });
}
}
