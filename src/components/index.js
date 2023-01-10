import '../index.css';
import {
  popupTypeProfile,
  popupTypeNewcard,
  popupTypeZoom,
  imageTitle,
  imageLink,
  newCard,
  popupTypeAvatar,
  avatarLink,
  avatarImage,
  avatarForm,
  buttonSaverNewCard,
  buttonSaverProfile,
  buttonSaverAvatar,
  formTypeProfile,
  firstname,
  description,
  profileTitle,
  profileSubtitle,
  profileEditButton,
  profileAddButton,
  profileAvatarButton} from './constants';
import {enableValidation, stayButtonDidabled, settings} from './validate';
import {closePopupOverlay, openPopup, closePopup} from './modal';
import {createCard, elementContainer} from './card';
import {getProfileInfo, loadCardsFromServer, sendNewCard, sendProfileInfo, loadNewAvatar} from './api';

//Загружаем актуальные данные профиля
function renderResult(title, text) {
  title.textContent = text;
};


function renderAvatar(text) {
  const avatar = document.querySelector('.profile__image');
  avatar.src = text;
};


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

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaverProfile.textContent = "Сохранить";
    });
    closePopup (popupTypeProfile);
};

formTypeProfile.addEventListener('submit', editProfileForm);

//Вызов закрытие попапов кликом на оверлей
closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);
closePopupOverlay(popupTypeAvatar);

//Вызов валидации форм
enableValidation (settings);



//Получаем актуальные данные с сервера
const profile = document.querySelector('.profile');
Promise.all([getProfileInfo(), loadCardsFromServer()])
  .then(([userID, cards]) => {
    profile.id = userID._id;
    cards.forEach((card) => {
      const elementCard = createCard(card, profile);
      elementContainer.append(elementCard);
    })
    getProfileInfo()
    .then((res) => {
      renderResult(profileTitle, res.name);
      renderResult(profileSubtitle, res.about);
      renderAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
  });

//Добавляем новую карточку
export function addNewElement (evt) {
  evt.preventDefault();
  buttonSaverNewCard.textContent = 'Сохраняем...';
  sendNewCard(imageTitle.value, imageLink.value)
    .then((card) => {
      elementContainer.prepend(createCard(card, profile));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaverNewCard.textContent = "Сохранить";
    });
    closePopup(popupTypeNewcard);
};

newCard.addEventListener('submit', addNewElement);


//Добавляем новый аватар
function submitNewAvatar(evt) {
  evt.preventDefault();
  buttonSaverAvatar.textContent = 'Сохраняем...'
  loadNewAvatar(avatarLink.value)
    .then((res) => {
      avatarImage.src = res.avatar;
      avatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaverAvatar.textContent = "Сохранить";
    });
    closePopup(popupTypeAvatar);
  };

avatarForm.addEventListener('submit', submitNewAvatar);


//Слушатели попапов
profileEditButton.addEventListener('click', function() {
  openPopup(popupTypeProfile)
});

profileAddButton.addEventListener('click', function() {
  openPopup(popupTypeNewcard);
  newCard.reset();stayButtonDidabled();
});

profileAvatarButton.addEventListener('click', function() {
  openPopup(popupTypeAvatar);
})
