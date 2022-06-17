const dataElement = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// Показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, dataElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(dataElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataElement.errorClass);
};

// Скрыть ошибку ввода
const hideInputError = (formElement, inputElement, dataElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(dataElement.inputErrorClass);
  errorElement.classList.remove(dataElement.errorClass);
  errorElement.textContent = "";
};

// Проверить валидность ввода
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Переключение состояния кнопки
const toggleButtonState = (inputList, dataElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(dataElement.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(dataElement.submitButtonSelector);
  }
};

// Принимает параметром элемент формы и добавляет полям нужные обработчики
const setEventListeners = (formElement, dataElement) => {
  const inputList = Array.from(formElement.querySelectorAll(dataElement.inputSelector));
  const buttonElement = formElement.querySelectorAll(dataElement.submitButtonSelector);
  // Проверка состояния кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызываем функцию проверки валидности ввода, передавая форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
      // Проверка состояния кнопки при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
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
const enableValidation = () => {
  // Поиск всех форм в DOM и создание из них массива
  const formList = Array.from(document.querySelectorAll(dataElement.formSelector));
  // Перебор полученной коллекции форм
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  setEventListeners(formElement);
  });
};

enableValidation();
