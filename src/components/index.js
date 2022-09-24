import '../index.css';
import {enableValidation} from './validate';
import {popupTypeProfile, popupTypeNewcard, popupTypeZoom, closePopupOverlay,} from './modal';
import {addCardsFromArray} from './card';
import {initialCards} from './constants';
import {formTypeProfile, editProfileForm} from './utilits';



//Вызов закрытие попапов кликом на оверлей
closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);

//слушатель редактирования формы профиля
formTypeProfile.addEventListener('submit', editProfileForm);


//Вызов валидации форм
enableValidation ();

//Вызов добавления карточек из массива
addCardsFromArray(initialCards);







