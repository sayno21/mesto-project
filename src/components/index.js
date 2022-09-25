import '../index.css';
import {initialCards, popupTypeProfile, popupTypeNewcard, popupTypeZoom} from './constants';
import {enableValidation} from './validate';
import {closePopupOverlay} from './modal';
import {addCardsFromArray} from './card';
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







