import {checkRes} from './utilits';

//Загрузка информации о пользователе с сервера
export const getProfileInfo = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me', {
  headers: {
    authorization: 'c977941d-c8c4-4145-ba23-754c541f6927'
  }
})
  .then((res) => checkRes(res))
}


//Загрузка карточек с сервера
export const loadCardsFromServer = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
  headers: {
    authorization: 'c977941d-c8c4-4145-ba23-754c541f6927'
  }
})
  .then((res) => checkRes(res))
}


//Отправка данных пользователя
export const sendProfileInfo = (data) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'c977941d-c8c4-4145-ba23-754c541f6927',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then((res) => checkRes(res))
}

//Отправка новой карточки
export const sendNewCard = (card) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    method: 'POST',
    headers: {
      authorization: 'c977941d-c8c4-4145-ba23-754c541f6927',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then((res) => checkRes(res))
}

//Отправляем новый аватар
export const loadNewAvatar = (url) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'c977941d-c8c4-4145-ba23-754c541f6927',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({avatar: url})
  })
  .then((res) => checkRes(res))
}
