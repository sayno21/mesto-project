import {popupTypeProfile, closePopup} from './modal';

//----------------Редактирование профиля---------------
export const formTypeProfile = document.querySelector('.form_type_profile');
const firstname = document.querySelector('.form__text_type_firstmane');
const description = document.querySelector('.form__text_type_description');


const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

export function editProfileForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = firstname.value;
  profileSubtitle.textContent = description.value;
  closePopup (popupTypeProfile);
}

