import {addCardLike, deleteCardLike, deleteCardFromServer} from './api'

export function checkRes (res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status);
};

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
