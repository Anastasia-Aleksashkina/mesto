const popupUser = document.querySelector(".popup");
const popupNewCard = document.querySelector(".popup_new-card");
const popupNewImage = document.querySelector(".popup_image");
const formElementUser = document.querySelector(".popup__form");
const formElementCard = document.querySelector(".popup__form_new-card");
const formElementImage = document.querySelector(".popup__form_image");
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
};
const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
};
const popupCloseUser = document.querySelector(".popup__button-close");
const popupCloseCard = document.querySelector(".popup__button-close_new-card");
const popupCloseImage = document.querySelector(".popup__button-close_image");
const nameFieldElement = formElementUser.querySelector(".popup__string-name");
const aboutFieldElement = formElementUser.querySelector(".popup__string-about");
const cityFieldElement = formElementCard.querySelector(
  ".popup__string-name_new-card"
);
const linktFieldElement = formElementCard.querySelector(
  ".popup__string-about_new-card"
);
const editButtonUser = document.querySelector(".profile__button-edit");
const editButtonCard = document.querySelector(".profile__button-edd");
const editImageCard = document.querySelector(".popup__image");
const nameElement = document.querySelector(".profile__user-name");
const aboutElement = document.querySelector(".profile__user-about");
const cardContainer = document.querySelector(".elements");
const getCardByElement = (e) => e.currentTarget.closest(".element");

nameFieldElement.value = nameElement.textContent;
aboutFieldElement.value = aboutElement.textContent;

//попап с картинкой
const openImagePopup = (e) => {
  const imageElement = getCardByElement(e);
  openPopup(popupNewImage);
  popupNewImage.link = imageElement.querySelector(".popup__image").src;
  popupNewImage.name = imageElement.querySelector(".popup__caption").textContent;
};


const addCard = (element) => {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__city").textContent = element.name;
  cardElement.querySelector(".element__image").src = element.link;
  cardElement.querySelector(".element__like").addEventListener("click", (e) => {
    e.target.classList.toggle("element__like_active");
  });
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", (e) => {
      const element = getCardByElement(e);
      element.remove();
    });
  cardContainer.prepend(cardElement);
  popupNewImage.addEventListener("click", openImagePopup);
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
  closePopup(popupNewCard);
};

editButtonUser.addEventListener("click", () => openPopup(popupUser));
editButtonCard.addEventListener("click", () => openPopup(popupNewCard));
popupCloseUser.addEventListener("click", () => closePopup(popupUser));
popupCloseCard.addEventListener("click", () => closePopup(popupNewCard));
popupCloseImage.addEventListener("click", () => closePopup(popupNewImage));
formElementUser.addEventListener("submit", handlerProfileSubmit);
formElementCard.addEventListener("submit", handlerCardSubmit);
