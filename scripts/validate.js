const dataElement = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible"
};

// Показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, dataElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(dataElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataElement.errorClass);
  console.log(inputElement);
};

// Скрыть ошибку ввода
const hideInputError = (formElement, inputElement, dataElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(dataElement.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(dataElement.errorClass);
  console.log(inputElement);
};

// Проверить валидность ввода
const checkInputValidity = (formElement, inputElement, dataElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, dataElement);
  } else {
    hideInputError(formElement, inputElement, dataElement);
  }
};

// Переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement, dataElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, dataElement)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(dataElement.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(dataElement.inactiveButtonClass);
  }
};

// Принимает параметром элемент формы и добавляет полям нужные обработчики
const setEventListeners = (formElement, dataElement) => {
  const inputList = Array.from(formElement.querySelectorAll(dataElement.inputSelector));
  const buttonElement = formElement.querySelector(dataElement.submitButtonSelector);
  // Проверка состояния кнопки в самом начале
  toggleButtonState(inputList, buttonElement, dataElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызываем функцию проверки валидности ввода, передавая форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, dataElement);
      // Проверка состояния кнопки при изменении любого из полей
      toggleButtonState(inputList, buttonElement, dataElement);
    });
  });
};

// Добавление обработчиков событий к полям формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// Поиск и перебор всех форм на странице
const enableValidation = (dataElement) => {
  // Поиск всех форм в DOM и создание из них массива
  const formList = Array.from(document.querySelectorAll(dataElement.formSelector));
  // Перебор полученной коллекции форм
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  setEventListeners(formElement, dataElement);
  });
};

enableValidation(dataElement);
