import {popupTypeNewcard} from './constants';
//----------------Валидация форм---------------
export const settings = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_type_disabled',
  inputErrorClass: 'form__text-error',
  errorClass: 'form__text-error_active'
}
//показывает сообщение об ошибке
const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass)
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//скрывает сообщение об ошибке
const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass)
  errorElement.classList.remove(errorClass);
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
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorClass)
  }
};

//проверяет все поля ввода на валидацию по введенным символам и отключает или включает кнопку
const setEventListeners = (formElement, inputSelector, submitButtonSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//валидация всех форм
export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings.inputSelector,
      settings.submitButtonSelector,
      settings.inactiveButtonClass,
      settings.inputErrorClass,
      settings.errorClass);
  });
}

//проверяет неправильно введенное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

//переключатель состояния кнопки
const toggleButtonState =  (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}


export const  stayButtonDidabled = (submitButtonSelector, inactiveButtonClass) => {
  const saveButton = popupTypeNewcard.querySelector(submitButtonSelector);
  saveButton.classList.add(inactiveButtonClass);
  saveButton.setAttribute('disabled', true);
}
