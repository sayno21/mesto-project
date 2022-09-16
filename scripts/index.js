//---------------Открытие/Закрытие модальных окон---------------
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeNewcard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeZoom = document.querySelector('.popup_type_zoom');
const closeButtonProfile = document.querySelector('.close-button_profile');
const closeButtonNewcard = document.querySelector('.close-button_new-card');
const closeButtonZoom = document.querySelector('.popup__close-button_zoom-image');

function openPopup(popup) {popup.classList.add('popup_opened')};
profileEditButton.addEventListener('click', function() {openPopup(popupTypeProfile)});
profileAddButton.addEventListener('click', function() {openPopup(popupTypeNewcard)});

function closePopup(popup) {popup.classList.remove('popup_opened')};
closeButtonProfile.addEventListener('click', function(){closePopup(popupTypeProfile)});
closeButtonNewcard.addEventListener('click', function(){closePopup(popupTypeNewcard)});
closeButtonZoom.addEventListener('click', function(){closePopup(popupTypeZoom)});

//----------------Закрытие модальных окон нажатием на Esc-----------
document.addEventListener('keydown', function(evt){
  if (evt.key === 'Escape') {
    closePopup(popupTypeProfile);
    closePopup(popupTypeNewcard);
    closePopup(popupTypeZoom);
  }
})

//--------------Закрытие модальных окон кликом на оверлей-----
function closePopupOverlay(item) {
  item.addEventListener('click', function(evt){
    if (evt.target === item) {
      closePopup(item);
    }
  })
}

closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);


//----------------Редактирование профиля---------------
const formTypeProfile = document.querySelector('.form_type_profile');
const firstname = document.querySelector('.form__text_type_firstmane');
const description = document.querySelector('.form__text_type_description');


const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function editProfileForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = firstname.value;
  profileSubtitle.textContent = description.value;
  closePopup (popupTypeProfile);
}
formTypeProfile.addEventListener('submit', editProfileForm);

//----------------Валидациф форм---------------

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__text-error')
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__text-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__text-error')
  errorElement.classList.remove('form__text-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
};

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


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

const toggleButtonState =  (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_type_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('form__button_type_disabled');
    buttonElement.removeAttribute('disabled', true);
  }
}

enableValidation ();

//-----------------Добавление новых карточек------------------
const newCard = document.querySelector('.form_type_new-card');
const elementContainer = document.querySelector('.elements__container');
const templateElement = document.querySelector('.element-template').content;
const imageTitle = document.querySelector('.form__text_type_name');
const imageLink = document.querySelector('.form__text_type_image-link');

function addNewElement (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCards(imageTitle.value, imageLink.value));
  newCard.reset();
  closePopup(popupTypeNewcard);
}
newCard.addEventListener('submit', addNewElement);


function addCards(title, image) {

  const userCard = templateElement.cloneNode(true);
  const cardImage = userCard.querySelector('.element__image');
  cardImage.src = image;
  cardImage.alt = title;
  userCard.querySelector('.element__text').textContent = title;
  cardImage.addEventListener('click', function() {openPopupTypeZoom(title, image)});

    //-----Удаление карточки-----
    function elementDelete (evt) {evt.target.closest('.element').remove()};
    userCard.querySelector('.element__delete').addEventListener('click', elementDelete);
    //-----Лайк карточки------
    function elementLike (evt) {evt.target.classList.toggle('element__button_type_liked')};
    userCard.querySelector('.element__button').addEventListener('click', elementLike);

  return userCard;
}

//------------------Добавление карточек из массива-----------------
function addCardsFromArray(element) {
  element.forEach(function (item) {
    const card = addCards(item.name, item.link);
    elementContainer.prepend(card);
  });
}
addCardsFromArray(initialCards);

//------------Открытие маодального окна с разными карточками------------
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomImageTitle = document.querySelector('.popup__zoom-title');
function openPopupTypeZoom(title, image) {
  zoomImage.src = image;
  zoomImage.alt = title;
  zoomImageTitle.textContent = title;
  openPopup(popupTypeZoom);
}


