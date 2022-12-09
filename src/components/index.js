import '../index.css';
import {initialCards, popupTypeProfile, popupTypeNewcard, popupTypeZoom, elementContainer, imageTitle, imageLink, newCard} from './constants';
import {enableValidation} from './validate';
import {closePopupOverlay, openPopup, closePopup} from './modal';
import {addCards} from './card';
import {foo} from './api'

//Добавление новой карточки по сабмиту
function addNewElement (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCards(imageTitle.value, imageLink.value));
  closePopup(popupTypeNewcard);
}
newCard.addEventListener('submit', addNewElement);

//Редактирование профиля
const formTypeProfile = document.querySelector('.form_type_profile');
const firstname = document.querySelector('.form__text_type_firstmane');
const description = document.querySelector('.form__text_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

function editProfileForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = firstname.value;
  profileSubtitle.textContent = description.value;
  closePopup (popupTypeProfile);
}


//Вызов закрытие попапов кликом на оверлей
closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);

//слушатель редактирования формы профиля
formTypeProfile.addEventListener('submit', editProfileForm);

//Вызов валидации форм
enableValidation ();

//Вызов добавления карточек из массива
export function addCardsFromArray(element) {
  element.forEach(function (item) {
    const card = addCards(item.name, item.link);
    elementContainer.prepend(card);
  });
}


//Открытие маодального окна с разными карточками
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomImageTitle = document.querySelector('.popup__zoom-title');
export function openPopupTypeZoom(title, image) {
  zoomImage.src = image;
  zoomImage.alt = title;
  zoomImageTitle.textContent = title;
  openPopup(popupTypeZoom);
}

