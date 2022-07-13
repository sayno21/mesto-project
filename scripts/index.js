const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
function popupOpen () {
  popupTypeProfile.classList.add('popup_opened')
}
popupEditButton.addEventListener('click', popupOpen);
function popupClose () {
  popupTypeProfile.classList.remove('popup_opened')
}
popupCloseButton.addEventListener('click', popupClose);
