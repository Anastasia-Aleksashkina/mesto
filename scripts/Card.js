import { openPopup } from "./index.js";

export class Card {
  constructor(data) {
    // передаем конструктору параметры
    this._name = data.name;
    this._link = data.link;
  }

  // забираем разметку карточки из HTML, клонируем элемент и возвращаем элемент карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector("#element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  // забираем name и link из массива и готовим карточку к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(); // добавляем обработчики

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__city").textContent = this._name;
    this._element.querySelector(".element__city").alt = this._name;

    return this._element;
  }

  // добавляем метод для установки слушателей событий
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openImageClick();
      });
  }

  // добавляем метод для изменения класса лайка
  _handleLikeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  // добавляем метод для удаления карточки
  _handleDeleteClick() {
    this._element.remove();
  }

  // добавляем метод открытия карточки
  _openImageClick() {
    const popupImage = document.querySelector(".popup_image");
    const imageElement = document.querySelector(".popup__image-src");
    const captionElement = document.querySelector(".popup__caption");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    captionElement.textContent = this._name;
    return openPopup(popupImage);
  }
}
