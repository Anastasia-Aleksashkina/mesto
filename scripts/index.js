let editButton = document.querySelector(".profile__button-edit"),
  popup = document.querySelector(".popup"),
  popupClose = document.querySelector(".popup__button-close"),
  formElement = document.querySelector(".popup__form"),
  nameInput = document.querySelector(".popup__string-name"),
  titleElement = document.querySelector(".profile__user-name"),
  aboutInput = document.querySelector(".popup__string-about"),
  aboutElement = document.querySelector(".profile__user-about");

editButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});

popupClose.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  titleElement.textContent = nameInput.value;
  aboutElement.textContent = aboutInput.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
