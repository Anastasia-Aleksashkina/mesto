export default class FormValidator {
  constructor(formElement, dataElement) {
    this._formElement = formElement;
    this._dataElement = dataElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._dataElement.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._dataElement.submitButtonSelector
    );
  }

  // метод для отображения ошибки ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._dataElement.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._dataElement.errorClass);
  }

  // метод для скрытия ошибки ввода
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._dataElement.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._dataElement.errorClass);
  }

  // метод для проверки валидность ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // добавление обработчиков событий к полям формы
  _validateInput() {
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true, обход массива прекратится и метод validateInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  // метод переключения состояния кнопки
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._validateInput) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._dataElement.inactiveButtonClass);
      // this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._dataElement.inactiveButtonClass);
      // this._buttonElement.removeAttribute("disabled", true);
      this._buttonElement.disabled = false;
    }
  }

  // метод принимает параметром элемент формы и добавляет полям нужные обработчики
  _setEventListeners() {
    // // Проверка состояния кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // вызываем метол проверки валидности ввода, передавая форму и проверяемый элемент
        this._checkInputValidity(inputElement);
        // Проверка состояния кнопки при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
