import {popupTypeProfile, popupTypeNewcard, popupTypeZoom} from './constants';

//---------------Открытие/Закрытие модальных окон---------------
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtonProfile = document.querySelector('.close-button_profile');
const closeButtonNewcard = document.querySelector('.close-button_new-card');
const closeButtonZoom = document.querySelector('.popup__close-button_zoom-image');

function openPopup(popup) {popup.classList.add('popup_opened')};
profileEditButton.addEventListener('click', function() {openPopup(popupTypeProfile)});
profileAddButton.addEventListener('click', function() {openPopup(popupTypeNewcard)});

export function closePopup(popup) {popup.classList.remove('popup_opened')};
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
export function closePopupOverlay(item) {
  item.addEventListener('click', function(evt){
    if (evt.target === item) {
      closePopup(item);
    }
  })
}

//------------Открытие маодального окна с разными карточками------------
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomImageTitle = document.querySelector('.popup__zoom-title');
export function openPopupTypeZoom(title, image) {
  zoomImage.src = image;
  zoomImage.alt = title;
  zoomImageTitle.textContent = title;
  openPopup(popupTypeZoom);
}
