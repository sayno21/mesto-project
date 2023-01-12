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
  profileAvatarButton,
  closeButtonProfile,
  closeButtonNewcard,
  closeButtonZoom,
  closeButtonAvatar} from './constants';
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
      closePopup (popupTypeProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaverProfile.textContent = "Сохранить";
    });
};

formTypeProfile.addEventListener('submit', editProfileForm);

//Вызов закрытие попапов кликом на оверлей
closePopupOverlay(popupTypeProfile);
closePopupOverlay(popupTypeNewcard);
closePopupOverlay(popupTypeZoom);
closePopupOverlay(popupTypeAvatar);

//Закрытие попапов кликом на кнопку
closeButtonProfile.addEventListener('click', function(){closePopup(popupTypeProfile)});
closeButtonNewcard.addEventListener('click', function(){closePopup(popupTypeNewcard)});
closeButtonZoom.addEventListener('click', function(){closePopup(popupTypeZoom)});
closeButtonAvatar.addEventListener('click', function(){closePopup(popupTypeAvatar)});

//Вызов валидации форм
enableValidation (settings);



//Получаем актуальные данные с сервера
const profile = document.querySelector('.profile');
Promise.all([getProfileInfo(), loadCardsFromServer()])
  .then(([userInfo, cards]) => {
    profile.id = userInfo._id;
    cards.forEach((card) => {
      const elementCard = createCard(card, profile);
      elementContainer.append(elementCard);
      renderResult(profileTitle, userInfo.name);
      renderResult(profileSubtitle, userInfo.about);
      renderAvatar(userInfo.avatar);
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
      closePopup(popupTypeNewcard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaverNewCard.textContent = "Сохранить";
    });

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
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSaverAvatar.textContent = "Сохранить";
    });
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
