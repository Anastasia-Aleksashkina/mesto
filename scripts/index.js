const initialCards = [
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
const popupCloseUser = document.querySelector(".popup__button-close");
const popupCloseCard = document.querySelector(".popup__button-close_new-card");
const editButtonUser = document.querySelector(".profile__button-edit");
const editButtonCard = document.querySelector(".profile__button-edd");
const formElementUser = document.querySelector(".popup__form");
const formElementCard = document.querySelector(".popup__form_new-card");
const nameElement = document.querySelector(".profile__user-name");
const aboutElement = document.querySelector(".profile__user-about");
const nameFieldElement = document.querySelector(".popup__string-name");
const aboutFieldElement = document.querySelector(".popup__string-about");
const nameElementCity = document.querySelector(".element__city");
const aboutElementLink = document.querySelector(".element__image");
const nameFieldElementCity = document.querySelector(".popup__string-name_new-card");
const aboutFieldElementLink = document.querySelector(".popup__string-about_new-card");
const popupUser = document.querySelector(".popup");
const popupNewCard = document.querySelector(".popup_new-card");
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
};
const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
};
const cardContainer = document.querySelector(".elements");

nameFieldElement.value = nameElement.textContent;
aboutFieldElement.value = aboutElement.textContent;
function addNewCard(element) {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__city").textContent = element.name;
  cardElement.querySelector(".element__image").src = element.link;
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", function (e) {
      e.target.classList.toggle("element__like_active");
    });
  cardContainer.prepend(cardElement);
}
initialCards.forEach(addNewCard);
function formSubmitHandlerUser(e) {
  e.preventDefault();
  nameElement.textContent = nameFieldElement.value;
  aboutElement.textContent = aboutFieldElement.value;
  closePopup(popupUser);
}
function formSubmitHandlerCard(e) {
  e.preventDefault();
  nameElementCity.textContent = nameFieldElementCity.value;
  aboutElementLink.textContent = aboutFieldElementLink.value;
  closePopup(popupUser);
}
editButtonUser.addEventListener("click", () => openPopup(popupUser));
editButtonCard.addEventListener("click", () => openPopup(popupNewCard));
popupCloseUser.addEventListener("click", () => closePopup(popupUser));
popupCloseCard.addEventListener("click", () => closePopup(popupNewCard));
formElementUser.addEventListener("submit", formSubmitHandlerUser);
formElementCard.addEventListener("submit", formSubmitHandlerCard);
