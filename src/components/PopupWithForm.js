import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__button");
    this._submitButtonContent = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((element) => {
      values[element.name] = element.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputs.forEach((item) => {
      item.value = data[item.id];
      console.log(item);
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  // Визуализация индикатора сохранения формы (UX)
  renderLoadingView(loading, text) {
    if (loading) {
      this._submitButton.disabled = true;
      this._submitButton.textContent = text;
    } else {
      setTimeout(() => {
        this._submitButton.disabled = true;
        this._submitButton.textContent = this._submitButtonContent;
      }, 3000);
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
