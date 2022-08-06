export default class Card {
  constructor(cardObj, cardSelector, openImage, deleteCard) {
    // передаем конструктору параметры
    this._cardObj = cardObj;
    this._name = cardObj.name;
    this._link = cardObj.link;
    this._id = cardObj.id;
    this._cardSelector = cardSelector;
    this._openImage = openImage;
    this._deleteCard = deleteCard;
  }

  // забираем разметку карточки из HTML, клонируем элемент и возвращаем элемент карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
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
        this._deleteCard(this._id);
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
  delete() {
    this._element.remove();
    this._element = null;
  }
}