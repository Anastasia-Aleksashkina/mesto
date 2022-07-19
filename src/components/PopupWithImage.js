import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._name = this._popup.querySelector(".popup__caption");
    this._link = this._popup.querySelector(".popup__image-src");
  }

  open(name, link) {
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;
    super.open();
  }
}
