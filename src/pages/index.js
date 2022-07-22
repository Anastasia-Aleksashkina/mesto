import "./../pages/index.css";
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
  profileButton,
  сardButton,
  cardListSelector,
  formElementUser,
  formElementCard,
  nameFieldElement,
  aboutFieldElement,
  dataElement,
  initialCards,
} from "../utils/constants.js";

const openImage = (name, link) => {
  imagePopup.open(name, link);
};

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(data, "#element-template", openImage);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);
cardList.renderItem();

const userFormValidation = new FormValidator(formElementUser, dataElement);
const addFormValidation = new FormValidator(formElementCard, dataElement);
userFormValidation.enableValidation();
addFormValidation.enableValidation();

const profileInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  aboutSelector: ".profile__user-about",
})

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
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
  newCardPopup.close();
};

const newCardPopup = new PopupWithForm(popupCard, handlerCardSubmit);
newCardPopup.setEventListeners();

сardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidation.resetValidation();
});
