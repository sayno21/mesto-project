import '../index.css';
import {popupTypeProfile, popupTypeNewcard, popupTypeZoom, elementContainer, imageTitle, imageLink, newCard, popupTypeAvatar, avatarLink, avatarImage, avatarForm} from './constants';
import {enableValidation} from './validate';
import {closePopupOverlay, openPopup, closePopup} from './modal';
import {addCards} from './card';
import {getProfileInfo, loadCardsFromServer, sendNewCard, sendProfileInfo, loadNewAvatar} from './api';


//Редактирование профиля
export const formTypeProfile = document.querySelector('.form_type_profile');
export const firstname = document.querySelector('.form__text_type_firstmane');
export const description = document.querySelector('.form__text_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');


//Вызов закрытие попапов кликом на оверлей
closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);
closePopupOverlay(popupTypeAvatar);

//слушатель редактирования формы профиля
formTypeProfile.addEventListener('submit', editProfileForm);

//Вызов валидации форм
enableValidation ();


//Открытие маодального окна с разными карточками
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomImageTitle = document.querySelector('.popup__zoom-title');
export function openPopupTypeZoom(title, image) {
  zoomImage.src = image;
  zoomImage.alt = title;
  zoomImageTitle.textContent = title;
  openPopup(popupTypeZoom);
}

//Загружаем актуальные данные профиля
function renderResult(title, text) {
  title.textContent = text;
}

function renderError(title, err) {
  title.textContent = err;
}

function renderAvatar(text) {
  const avatar = document.querySelector('.profile__image');
  avatar.src = text;
}

getProfileInfo()
.then((res) => {
  renderResult(profileTitle, res.name);
  renderResult(profileSubtitle, res.about);
  renderAvatar(res.avatar);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
  renderError(profileTitle, `Ошибка: ${err}`);
  renderError(profileSubtitle, `Ошибка: ${err}`);
});

//Получаем актуальные карточки с сервера
function addCardsFromArray(element) {
  element.forEach(function (item) {
    const card = addCards(item.name, item.link);
    elementContainer.prepend(card);
  });
}

loadCardsFromServer()
  .then((res) => {
    addCardsFromArray(res);
  });

//Отображаем обновленные данные пользователя
function editProfileForm (evt) {
  evt.preventDefault();
  const data = {
    name: firstname.value,
    about: description.value
  }
  sendProfileInfo(data)
    .then(res => {
      renderResult(profileTitle, res.name);
      renderResult(profileSubtitle, res.about);
      renderAvatar(res.avatar);
      closePopup (popupTypeProfile);
    })

}

//Добавляем новую карточку
function addNewElement (evt) {
  evt.preventDefault();
  const cardData = {
    name: imageTitle.value,
    link: imageLink.value
  }
  sendNewCard(cardData);
  elementContainer.prepend(addCards(imageTitle.value, imageLink.value));
  closePopup(popupTypeNewcard);
}
newCard.addEventListener('submit', addNewElement);


//Добавляем новый аватар
// function avatarFormSubmit(e) {
//   e.preventDefault()
//   avatarSaveButton.textContent = 'Сохранение...'

//   changeAvatar(avatarInput.value)
//     .then(res => {
//       profileAvatar.src = res.avatar
//       avatarForm.reset()
//       closePopup()
//     })
//     .catch(err => console.log(err))
//     .finally(() => avatarSaveButton.textContent = 'Сохранить')
// }

function submitNewAvatar(evt) {
  evt.preventDefault();
  loadNewAvatar(avatarLink.value)
    .then((res) => {
      avatarImage.src = res.avatar;
      avatarForm.reset();
      closePopup(popupTypeAvatar);
    })


}
avatarForm.addEventListener('submit', submitNewAvatar);

