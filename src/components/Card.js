export default class Card {
  constructor(
    data,
    cardSelector,
    openImage,
    { userId, handleDeleteCard, handleLikeCard, handleDisLikeCard }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._openImage = openImage;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDisLikeCard = handleDisLikeCard;
  }

  // забираем разметку карточки из HTML, клонируем элемент и возвращаем элемент карточки
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardTemplate;
  }

  // Готовим карточку к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._likeButton = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._element.querySelector(".element__city").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    if (this._id !== this._ownerId) {
      this._deleteButton.style.display = "none";
      console.log(this._id);
      console.log(this._ownerId);
    }
    this.likesCounter(this._likes);
    this._setEventListeners();
    return this._element;
  }

  // слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like_active")) {
        this._handleDisLikeCard();
      } else {
        this._handleLikeCard();
      }
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._imageElement.addEventListener("click", () => {
      this._openImage(this._name, this._link);
    });
  }

  // удаление карточки
  delete() {
    this._element.remove();
    this._element = null;
  }

  like() {
    this._likeButton.classList.add("element__like_active");
  }

  disLike() {
    this._likeButton.classList.remove("element__like_active");
  }

  likesCounter(likes)
  { if (likes.length === 0) {
      this._likeCounter.textContent = "";
    } else {
      this._likeCounter.textContent = likes.length;
    }
  }
}
