import '../index.css';
import {popupTypeProfile, popupTypeNewcard, popupTypeZoom, imageTitle, imageLink, newCard, popupTypeAvatar, avatarLink, avatarImage, avatarForm, buttonSaverNewCard, buttonSaverProfile, buttonSaverAvatar, formTypeProfile, firstname, description, profileTitle, profileSubtitle} from './constants';
import {enableValidation} from './validate';
import {closePopupOverlay, openPopup, closePopup} from './modal';
import {addCards, likeCard, elementContainer} from './card';
import {getProfileInfo, loadCardsFromServer, sendNewCard, sendProfileInfo, loadNewAvatar, addCardLike, deleteCardLike, deleteCardFromServer} from './api';

//Загружаем актуальные данные профиля
function renderResult(title, text) {
  title.textContent = text;
};

function renderError(title, err) {
  title.textContent = err;
};

function renderAvatar(text) {
  const avatar = document.querySelector('.profile__image');
  avatar.src = text;
};

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

//Отображаем обновленные данные пользователя
function editProfileForm (evt) {
  evt.preventDefault();
  buttonSaverProfile.textContent = 'Сохраняем...'
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
};

formTypeProfile.addEventListener('submit', editProfileForm);

//Вызов закрытие попапов кликом на оверлей
closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);
closePopupOverlay(popupTypeAvatar);

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
};

//Получаем актуальные данные с сервера
const profile = document.querySelector('.profile');
Promise.all([getProfileInfo(), loadCardsFromServer()])
  .then(([userID, cards]) => {
    profile.id = userID._id;
    cards.forEach((card) => {
      const elementCard = addCards(card, profile);
      elementContainer.append(elementCard);
    })
  });

//Добавляем новую карточку
export function addNewElement (evt) {
  evt.preventDefault();
  sendNewCard(imageTitle.value, imageLink.value)
    .then((card) => {
      buttonSaverNewCard.textContent = 'Сохраняем...';
      elementContainer.prepend(addCards(card, profile));
      closePopup(popupTypeNewcard);
    })
    .catch((err) => {
      console.log(err);
    })
};

newCard.addEventListener('submit', addNewElement);


//Добавляем новый аватар
function submitNewAvatar(evt) {
  evt.preventDefault();
  loadNewAvatar(avatarLink.value)
    .then((res) => {
      avatarImage.src = res.avatar;
      buttonSaverAvatar.textContent = 'Сохраняем...'
      avatarForm.reset();
      closePopup(popupTypeAvatar);
    })
  };

avatarForm.addEventListener('submit', submitNewAvatar);

//Функция добавления лайка
export function addLikeHandler(elementCard, card, profile) {
    addCardLike(card._id)
      .then((card) => {
        likeCard(elementCard, card.likes, profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }

//Функция удаления лайка
export function deleteLikeHandler(elementCard, card, profile) {
    deleteCardLike(card._id)
      .then((card) => {
        likeCard(elementCard, card.likes, profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }

//Функция удаления карточки
export function deleteCardHandler(element) {
    deleteCardFromServer(element.id)
      .then(() => element.remove())
      .catch((err) => {
        console.log(err);
      });
  }
