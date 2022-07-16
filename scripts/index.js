const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeNewcard = document.querySelector('.popup_type_new-card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonProfile = document.querySelector('.close-button_profile');
const popupCloseButtonNewcard = document.querySelector('.close-button_new-card')
// const popup = document.querySelector('.popup');

function popupProfileOpen () {popupTypeProfile.classList.add('popup_opened')}
popupEditButton.addEventListener('click', popupProfileOpen);

function popupProfileClose () {popupTypeProfile.classList.remove('popup_opened')}
popupCloseButtonProfile.addEventListener('click', popupProfileClose);

function popupNewcardOpen () {popupTypeNewcard.classList.add('popup_opened')}
popupAddButton.addEventListener('click', popupNewcardOpen);

function popupNewcardClose () {popupTypeNewcard.classList.remove('popup_opened')}
popupCloseButtonNewcard.addEventListener('click', popupNewcardClose);

// function popupClose () {popup.classList.remove('popup_opened')}
// popupCloseButton.addEventListener('click', popupClose);
