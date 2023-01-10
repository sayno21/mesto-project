import {checkRes} from './utilits';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17',
  headers: {
    authorization: 'c977941d-c8c4-4145-ba23-754c541f6927',
    'Content-Type': 'application/json'
  }
}

//Загрузка информации о пользователе с сервера
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}


//Загрузка карточек с сервера
export const loadCardsFromServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}


//Отправка данных пользователя
export const sendProfileInfo = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then((res) => checkRes(res))
    .catch((err) => {
      console.log(err);
    });
}

//Отправка новой карточки
export const sendNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}

//Отправляем новый аватар
export const loadNewAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar: url})
  })
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}

//Отправляем лайк карточки
export const addCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}

//Удаляеи лайк карточки
export const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}

//Удаляем карточку с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then((res) => checkRes(res))
  .catch((err) => {
    console.log(err);
  });
}
