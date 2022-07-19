import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  // popups,
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

// const createCard = (item) => {
//   const card = new Card(item, ".elements");
//   const cardElement = card.generateCard();
//   return cardElement;
// };
const openImage = (name, link) => {
  imagePopup.open(name, link);
};

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const CardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".elements", openImage);
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
    },
  },
  cardListSelector
);
CardList.renderItem();

const userFormValidation = new FormValidator(formElementUser, dataElement);
const addFormValidation = new FormValidator(formElementCard, dataElement);
userFormValidation.enableValidation();
addFormValidation.enableValidation();

// const handlEscape = (e) => {
//   if (e.key === "Escape") {
//     closePopup(document.querySelector(".popup_opened"));
//   }
// };

// export const openPopup = (popup) => {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", handlEscape);
// };

// const closePopup = (popup) => {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", handlEscape);
// };

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (e) => {
//     if (
//       e.target.classList.contains("popup_opened") ||
//       e.target.classList.contains("popup__button-close")
//     ) {
//       closePopup(popup);
//     }
//   });
// });

// const addCard = (element) => {
//   const cardElement = createCard(element);
//   cardContainer.prepend(cardElement);
// };

// initialCards.forEach(addCard);

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
  CardList.addItem(card);
  closePopup(popupCard);
  formElementCard.reset();
};

profileButton.addEventListener("click", () => {
  openPopup(popupUser);
  nameFieldElement.value = nameElement.textContent;
  aboutFieldElement.value = aboutElement.textContent;
  userFormValidation.resetValidation();
  userFormValidation.disabledButton();
});

сardButton.addEventListener("click", () => {
  // openPopup(popupCard);
  cityFieldElement.value = "";
  linktFieldElement.value = "";
  addFormValidation.resetValidation();
});
formElementUser.addEventListener("submit", handlerProfileSubmit);
formElementCard.addEventListener("submit", handlerCardSubmit);
