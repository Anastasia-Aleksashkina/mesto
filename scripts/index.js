import Card from "./Card.js";
import { initialCards } from "./cards.js";
import FormValidator from "./FormValidator.js";

const popups = document.querySelectorAll(".popup");
const popupUser = document.querySelector(".popup_profile");
const popupCard = document.querySelector(".popup_new-card");
const profileButton = document.querySelector(".profile__button-edit");
const сardButton = document.querySelector(".profile__button-edd");
const nameElement = document.querySelector(".profile__user-name");
const aboutElement = document.querySelector(".profile__user-about");
const cardContainer = document.querySelector(".elements");
const formElementUser = document.querySelector(".popup__form");
const formElementCard = document.querySelector(".popup__form_new-card");
const nameFieldElement = formElementUser.querySelector(".popup__input-name");
const aboutFieldElement = formElementUser.querySelector(".popup__input-about");
const cityFieldElement = formElementCard.querySelector(".popup__input-city");
const linktFieldElement = formElementCard.querySelector(".popup__input-link");
const buttonElementSubmit = formElementCard.querySelector(".popup__button");

const dataElement = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
};

const userFormValidation = new FormValidator(formElementUser, dataElement);
const addFormValidation = new FormValidator(formElementCard, dataElement);
userFormValidation.enableValidation();
addFormValidation.enableValidation();

const handlEscape = (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlEscape);
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (
      e.target.classList.contains("popup_opened") ||
      e.target.classList.contains("popup__button-close")
    ) {
      closePopup(popup);
    }
  });
});

const createCard = (data) => {
  const card = new Card(data);
  const cardElement = card.generateCard();
  return cardElement;
}

const addCard = (element) => {
  const cardElement = createCard(element);
  cardContainer.prepend(cardElement);
};

initialCards.forEach(addCard);

const handlerProfileSubmit = (e) => {
  e.preventDefault();
  nameElement.textContent = nameFieldElement.value;
  aboutElement.textContent = aboutFieldElement.value;
  closePopup(popupUser);
};

const handlerCardSubmit = (e) => {
  e.preventDefault();
  const card = {
    name: cityFieldElement.value,
    link: linktFieldElement.value,
  };
  addCard(card);
  formElementCard.reset();
  closePopup(popupCard);
  buttonElementSubmit.classList.add("popup__button_disabled");
  buttonElementSubmit.disabled = true;
};

profileButton.addEventListener("click", () => {
  openPopup(popupUser);
  nameFieldElement.value = nameElement.textContent;
  aboutFieldElement.value = aboutElement.textContent;
});
сardButton.addEventListener("click", () => openPopup(popupCard));
formElementUser.addEventListener("submit", handlerProfileSubmit);
formElementCard.addEventListener("submit", handlerCardSubmit);
