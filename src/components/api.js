import {checkRes} from './utilits';
import {addCardsFromArray, profileTitle, profileSubtitle} from './index';


//Загрузка информации о пользователе с сервера
fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me', {
  headers: {
    authorization: 'c977941d-c8c4-4145-ba23-754c541f6927'
  }
})
  .then((res) => checkRes(res))
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


//загрузка карточек с сервера
fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
  headers: {
    authorization: 'c977941d-c8c4-4145-ba23-754c541f6927'
  }
})
  .then((res) => checkRes(res))
  .then((res) => {
    console.log(res);
    addCardsFromArray(res);
  });

