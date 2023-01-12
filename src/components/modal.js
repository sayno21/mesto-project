import {popupTypeZoom} from './constants';

//---------------Открытие/Закрытие модальных окон---------------
const closeButtonProfile = document.querySelector('.close-button_profile');
const closeButtonNewcard = document.querySelector('.close-button_new-card');
const closeButtonZoom = document.querySelector('.popup__close-button_zoom-image');
const closeButtonAvatar = document.querySelector('.popup__close-button_avatar');

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



export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', listenEscape);
};




//--------------Закрытие модальных окон кликом на оверлей-----
export function closePopupOverlay(item) {
  item.addEventListener('click', function(evt){
    if (evt.target === item) {
      closePopup(item);
    }
  })
}

//Открытие маодального окна с разными карточками
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomImageTitle = document.querySelector('.popup__zoom-title');
export function openPopupTypeZoom(title, image) {
  zoomImage.src = image;
  zoomImage.alt = title;
  zoomImageTitle.textContent = title;
  openPopup(popupTypeZoom);
};
