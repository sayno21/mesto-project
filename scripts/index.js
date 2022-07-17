const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeNewcard = document.querySelector('.popup_type_new-card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonProfile = document.querySelector('.close-button_profile');
const popupCloseButtonNewcard = document.querySelector('.close-button_new-card')


function popupProfileOpen () {popupTypeProfile.classList.add('popup_opened')}
popupEditButton.addEventListener('click', popupProfileOpen);

function popupProfileClose () {popupTypeProfile.classList.remove('popup_opened')}
popupCloseButtonProfile.addEventListener('click', popupProfileClose);

function popupNewcardOpen () {popupTypeNewcard.classList.add('popup_opened')}
popupAddButton.addEventListener('click', popupNewcardOpen);

function popupNewcardClose () {popupTypeNewcard.classList.remove('popup_opened')}
popupCloseButtonNewcard.addEventListener('click', popupNewcardClose);



const formTypeProfile = document.querySelector('.form_type_profile');
const firstnameInput = formTypeProfile.querySelector('.form__text_type_firstmane');
const descriptionInput = formTypeProfile.querySelector('.form__text_type_description');

function formSubmitHandler (evt) {
  evt.preventDefault();
  firstnameInput.getAttribute('value');
  descriptionInput.getAttribute('value');
  let name = document.querySelector('.profile__title');
  let occupation = document.querySelector('.profile__subtitle');
  name.textContent = firstnameInput.value;
  occupation.textContent = descriptionInput.value;
  popupProfileClose();
}

formTypeProfile.addEventListener('submit', formSubmitHandler);
