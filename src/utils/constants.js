export const popups = document.querySelectorAll(".popup");
export const popupUser = document.querySelector(".popup_profile");
export const popupCard = document.querySelector(".popup_new-card");
export const popupImage = document.querySelector(".popup_image");
export const profileButton = document.querySelector(".profile__button-edit");
export const сardButton = document.querySelector(".profile__button-edd");
export const nameElement = document.querySelector(".profile__user-name");
export const aboutElement = document.querySelector(".profile__user-about");
export const cardListSelector = document.querySelector(".elements");
export const formElementUser = document.querySelector(".popup__form");
export const formElementCard = document.querySelector(".popup__form_new-card");
export const nameFieldElement = formElementUser.querySelector(".popup__input-name");
export const aboutFieldElement = formElementUser.querySelector(".popup__input-about");
export const cityFieldElement = formElementCard.querySelector(".popup__input-city");
export const linktFieldElement = formElementCard.querySelector(".popup__input-link");

export const dataElement = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
};

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];