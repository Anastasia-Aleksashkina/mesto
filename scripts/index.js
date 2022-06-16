const popups = document.querySelectorAll(".popup");
const popupUser = document.querySelector(".popup_profile");
const popupCard = document.querySelector(".popup_new-card");
const popupImage = document.querySelector(".popup_image");
const editButtonUser = document.querySelector(".profile__button-edit");
const editButtonCard = document.querySelector(".profile__button-edd");
const nameElement = document.querySelector(".profile__user-name");
const aboutElement = document.querySelector(".profile__user-about");
const imageElement = document.querySelector(".element__image");
const cityElement = document.querySelector(".element__city");
const cardContainer = document.querySelector(".elements");
const formElementUser = document.querySelector(".popup__form");
const formElementCard = document.querySelector(".popup__form_new-card");
const nameFieldElement = formElementUser.querySelector(".popup__input-name");
const aboutFieldElement = formElementUser.querySelector(".popup__input-about");
const cityFieldElement = formElementCard.querySelector(".popup__input-city");
const linktFieldElement = formElementCard.querySelector(".popup__input-link");
const imageFieldElement = document.querySelector(".popup__image-src");
const captionFieldElement = document.querySelector(".popup__caption");

const handlEscape= (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  };
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlEscape);
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (e.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

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
    openPopup(popupImage);
    openImagePopup(item);
  });

  return cardElement;
};

const addCard = (element) => {
  const cardElement = createCard(element);
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
  closePopup(popupCard);
  formElementCard.reset();
};

editButtonUser.addEventListener("click", () => {
  openPopup(popupUser);
  nameFieldElement.value = nameElement.textContent;
  aboutFieldElement.value = aboutElement.textContent;
});
editButtonCard.addEventListener("click", () => openPopup(popupCard));
formElementUser.addEventListener("submit", handlerProfileSubmit);
formElementCard.addEventListener("submit", handlerCardSubmit);
