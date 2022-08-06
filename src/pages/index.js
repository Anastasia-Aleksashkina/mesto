import "./../pages/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithAccept from "../components/PopupWithAccept.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupUser,
  popupCard,
  popupImage,
  popupAvatar,
  popupAccept,
  profileButton,
  сardButton,
  avatarButton,
  cardListSelector,
  formElementUser,
  formElementCard,
  formElementAvatar,
  dataElement,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "57fe7532-adaf-4e02-b40f-30da1bce78cd",
    "Content-Type": "application/json",
  },
});

const openImage = (name, link) => {
  imagePopup.open(name, link);
};

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const createCard = (cardObj) => {
  const card = new Card(cardObj, "#element-template", openImage, deleteMyCard);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);

// Попап добавления нового места
const newCardPopup = new PopupWithForm(popupCard, {
  submitForm: handlerCardSubmit,
});
newCardPopup.setEventListeners();

// Открытие попапа добавления нового места
сardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidation.resetValidation();
});

// Отправка данных формы добавления нового места
function handlerCardSubmit(data) {
  newCardPopup.renderLoadingView(true, "Сохранение...");
  api
    .addCard(data)
    .then((res) => {
      cardList.addItem(createCard(res));
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      newCardPopup.renderLoadingView(false);
    });
}

// Попап изменения профиля
const profilePopup = new PopupWithForm(popupUser, {
  submitForm: handlerProfileSubmit,
});
profilePopup.setEventListeners();

const profileInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
  avatarSelector: ".profile__avatar-img",
});

// Отправка данных формы изменения профиля
function handlerProfileSubmit(data) {
  profilePopup.renderLoadingView(true, "Сохранение...");
  api
    .changeProfile(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profilePopup.renderLoadingView(false);
    });
}

// Открытие попапа изменения профиля
profileButton.addEventListener("click", () => {
  const info = profileInfo.getUserInfo();
  profilePopup.setInputValues(info);
  profilePopup.open();
  userFormValidation.resetValidation();
  userFormValidation.disabledButton();
});

// Попап изменения аватара
const avatarPopup = new PopupWithForm(popupAvatar, {
  submitForm: handlerAvatarSubmit,
});
avatarPopup.setEventListeners();

// Отправка данных формы изменения аватара
function handlerAvatarSubmit(data) {
  avatarPopup.renderLoadingView(true, "Сохранение...");
  api
    .changeAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.renderLoadingView(false);
    });
}

// Открытие попапа изменения аватара
avatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidation.resetValidation();
});

// Попап подтверждения удаления моей карточки
const acceptPopup = new PopupWithAccept(popupAccept, {
  submitForm: deleteMyCard,
});
acceptPopup.setEventListeners();

// Удаление карточки на сервере
function deleteMyCard(card) {
  api
    .deleteCard(card.id)
    .then(() => {
      acceptPopup.close();
      card.delete();
    })
    .catch((err) => console.log(err))
}

// Удаление нового места (появление окна с подтверждением и удаление)
const acceptDeleteCard = (card) => {
  acceptPopup.open(card);
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    profileInfo.setUserInfo(data);
    cardList.renderItem(cards.reverse());
  })
  .catch((err) => console.log(err));

// Валидация форм
const userFormValidation = new FormValidator(formElementUser, dataElement);
const addFormValidation = new FormValidator(formElementCard, dataElement);
const avatarFormValidation = new FormValidator(formElementAvatar, dataElement);
userFormValidation.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();
