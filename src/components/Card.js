export default class Card {
  constructor(data, selector, openImage) {
    // передаем конструктору параметры
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openImage = openImage;
  }

  // забираем разметку карточки из HTML, клонируем элемент и возвращаем элемент карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  // забираем name и link из массива и готовим карточку к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._setEventListeners(); // добавляем обработчики

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector(".element__city").textContent = this._name;

    return this._element;
  }

  // метод для установки слушателей событий
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
        this._openImage(this._name, this._link);
      });
  }

  // метод для изменения класса лайка
  _handleLikeClick() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  // метод для удаления карточки
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  // // метод открытия карточки
  // _openImageClick() {
  //   imageElement.src = this._link;
  //   imageElement.alt = this._name;
  //   captionElement.textContent = this._name;
  //   return openPopup(popupImage);
  // }
}
