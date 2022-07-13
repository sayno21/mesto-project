const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
function popupOpen () {
  popupTypeProfile.classlist.add('.popup_opened');
}
popupOpen (popupTypeProfile);
popupEditButton.addEventListener('click', popupOpen);
