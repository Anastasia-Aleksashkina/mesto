const dataElement = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, dataElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(dataElement.inputErrorClass);
  errorElement.classList.add(dataElement.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, dataElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(dataElement.inputErrorClass);
  errorElement.classList.remove(dataElement.errorClass);
  errorElement.textContent = "";

}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement)
  }
};

const toggleButtonState = (inputList, buttonElement, dataElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(dataElement.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(dataElement.submitButtonSelector);
  }
};

const setEventListeners = (formElement, dataElement) => {
  const inputList = Array.from(dataElement.formSelector);
  const buttonElement = formElement(dataElement.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

const enableValidation = (dataElement) => {
  const formList = Array.from(dataElement.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  });
};

enableValidation(dataElement);
