//----------------Валидация форм---------------

//показывает сообщение об ошибке
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__text-error')
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__text-error_active');
};

//скрывает сообщение об ошибке
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__text-error')
  errorElement.classList.remove('form__text-error_active');
  errorElement.textContent = '';
};

//проверяет на корректность введенных данных и вызывает showError и hideError
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    //заменяем встроенное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
};

//проверяет все поля ввода на валидацию по введенным символам и отключает или включает кнопку
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__text'));
  const buttonElement = formElement.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//валидация всех форм
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

//проверяет неправильно введенное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

//переключатель состояния кнопки
const toggleButtonState =  (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_type_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('form__button_type_disabled');
    buttonElement.removeAttribute('disabled', true);
  }
}
