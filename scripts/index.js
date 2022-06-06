const popupUser = document.querySelector(".popup_profile");
const popupNewCard = document.querySelector(".popup_new-card");
const popupNewImage = document.querySelector(".popup_image");
const formElementUser = document.querySelector(".popup__form");
const formElementCard = document.querySelector(".popup__form_new-card");
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
const imageFieldElement = document.querySelector(".popup__image-src");
const captionFieldElement = document.querySelector(".popup__caption");
const editButtonUser = document.querySelector(".profile__button-edit");
const editButtonCard = document.querySelector(".profile__button-edd");
const nameElement = document.querySelector(".profile__user-name");
const aboutElement = document.querySelector(".profile__user-about");
const imageElement = document.querySelector(".element__image");
const cityElement = document.querySelector(".element__city");

const cardContainer = document.querySelector(".elements");
const getCardByElement = (e) => e.currentTarget.closest(".element");

const createCard = (item) => {
  const cardTemplate = document.querySelector("#element-template").content;
    const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    cardElement.querySelector(".element__city").textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector(".element__like").addEventListener("click", (e) => {
      e.target.classList.toggle("element__like_active");
    });
    cardElement
      .querySelector(".element__delete")
      .addEventListener("click", (e) => {
        const element = getCardByElement(e);
        element.remove();
      });
    cardImage.addEventListener("click", () => {
      openPopup(popupNewImage);
      openImagePopup(item);
    });
    return cardElement;
}

const addCard = (element) => {
  const cardElement = createCard(element)
  cardContainer.prepend(cardElement);
};

initialCards.forEach(addCard);

const openImagePopup = (element) => {
  imageFieldElement.src = element.link;
  imageFieldElement.alt = element.name;
  captionFieldElement.textContent = element.name;
};

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
  formElementCard.reset();
};

editButtonUser.addEventListener("click", (e) => {
  openPopup(popupUser);
  nameFieldElement.value = nameElement.textContent;
  aboutFieldElement.value = aboutElement.textContent;
});
editButtonCard.addEventListener("click", () => openPopup(popupNewCard));
popupCloseUser.addEventListener("click", () => closePopup(popupUser));
popupCloseCard.addEventListener("click", () => closePopup(popupNewCard));
popupCloseImage.addEventListener("click", () => closePopup(popupNewImage));
formElementUser.addEventListener("submit", handlerProfileSubmit);
formElementCard.addEventListener("submit", handlerCardSubmit);
