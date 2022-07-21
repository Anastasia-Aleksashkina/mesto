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
  nameElement,
  aboutElement,
  cardListSelector,
  formElementUser,
  formElementCard,
  nameFieldElement,
  aboutFieldElement,
  cityFieldElement,
  linktFieldElement,
  dataElement,
  initialCards,
} from "../utils/constants.js";

const openImage = (name, link) => {
  imagePopup.open(name, link);
};

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#element-template", openImage);
      const cardElement = card.generateCard();
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
  name: nameElement,
  about: aboutElement,
})

const handlerProfileSubmit = (data) => {
  profileInfo.setUserInfo(data);
};

const profilePopup = new PopupWithForm(popupUser, handlerProfileSubmit);
profilePopup.setEventListeners();

profileButton.addEventListener("click", () => {
  profilePopup.open();
  nameFieldElement.value = nameElement.textContent;
  aboutFieldElement.value = aboutElement.textContent;
  userFormValidation.resetValidation();
  userFormValidation.disabledButton();
});

const handlerCardSubmit = (data) => {
  const card = new Card(data, "#element-template");
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  newCardPopup.close();
};

const newCardPopup = new PopupWithForm(popupCard, handlerCardSubmit);
newCardPopup.setEventListeners();

сardButton.addEventListener("click", () => {
  newCardPopup.open();
  cityFieldElement.value = "";
  linktFieldElement.value = "";
  addFormValidation.resetValidation();
});
