import {popupTypeProfile, popupTypeNewcard, popupTypeZoom, newCard} from './constants';
import {stayButtonDidabled} from './validate';

//---------------Открытие/Закрытие модальных окон---------------
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtonProfile = document.querySelector('.close-button_profile');
const closeButtonNewcard = document.querySelector('.close-button_new-card');
const closeButtonZoom = document.querySelector('.popup__close-button_zoom-image');

function listenEscape (evt){
  if (evt.key === 'Escape') {
    const item = document.querySelector('.popup_opened');
    closePopup(item);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', listenEscape);

}

profileEditButton.addEventListener('click', function() {
  openPopup(popupTypeProfile)
});

profileAddButton.addEventListener('click', function() {
  openPopup(popupTypeNewcard);
  newCard.reset();stayButtonDidabled();
});

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', listenEscape);
};
closeButtonProfile.addEventListener('click', function(){closePopup(popupTypeProfile)});
closeButtonNewcard.addEventListener('click', function(){closePopup(popupTypeNewcard)});
closeButtonZoom.addEventListener('click', function(){closePopup(popupTypeZoom)});



//--------------Закрытие модальных окон кликом на оверлей-----
export function closePopupOverlay(item) {
  item.addEventListener('click', function(evt){
    if (evt.target === item) {
      closePopup(item);
    }
  })
}


