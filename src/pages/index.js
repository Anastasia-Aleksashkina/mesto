import "./../pages/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupUser,
  popupCard,
  popupImage,
  popupAvatar,
  profileButton,
  сardButton,
  cardListSelector,
  formElementUser,
  formElementCard,
  formElementAvatar,
  nameFieldElement,
  aboutFieldElement,
  dataElement,
  profileAvatarButton,
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

const createCard = (data) => {
  const card = new Card(data, "#element-template", openImage);
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

const userFormValidation = new FormValidator(formElementUser, dataElement);
const addFormValidation = new FormValidator(formElementCard, dataElement);
const avatarFormValidation = new FormValidator(formElementAvatar, dataElement);
userFormValidation.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();

const profileInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
  avatarSelector: ".profile__avatar",
});

const handlerProfileSubmit = (data) => {
  profileInfo.setUserInfo(data);
};

const profilePopup = new PopupWithForm(popupUser, handlerProfileSubmit);
profilePopup.setEventListeners();

profileButton.addEventListener("click", () => {
  profilePopup.open();
  const profileInfoValues = profileInfo.getUserInfo();
  nameFieldElement.value = profileInfoValues.name;
  aboutFieldElement.value = profileInfoValues.about;
  userFormValidation.resetValidation();
  userFormValidation.disabledButton();
});

const handlerCardSubmit = (data) => {
  return api
    .addCard(data)
    .then((data) => {
      cardList.addItem(createCard(data));
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const newCardPopup = new PopupWithForm(popupCard, handlerCardSubmit);
newCardPopup.setEventListeners();

сardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidation.resetValidation();
});

const changeAvatar = (data) => {
  return add.changeAvatar(data)
    .then((data) => {
      profileInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .catch((err) => console.log(err));
};

const avatarPopup = new PopupWithForm(popupAvatar, changeAvatar);
avatarPopup.setEventListeners();

profileAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidation.resetValidation();
})

api
  .getInitialCards()
  .then((item) => {
    cardList.renderItem(item);
  })
  .catch((err) => console.log(err));
