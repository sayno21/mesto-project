import {openPopupTypeZoom, addLikeHandler, deleteLikeHandler, deleteCardHandler} from './index';


export const elementContainer = document.querySelector('.elements__container');
export const elementTemplate = document.querySelector('#element').content;

//функция лайка карточки
export function likeCard(element, likeCount, userID) {
  const likeButton = element.querySelector('.element__button');
  const likeCounter = element.querySelector('.element__like-counter');
  if (likeCount.length > 0) {
    likeCount.forEach((user) => {
      if (user._id === userID.id) {
        likeButton.classList.add('element__button_type_liked');
      } else {
        likeButton.classList.remove('element__button_type_liked');
      }
    });
  } else {
    likeButton.classList.remove('element__button_type_liked');
  }
  likeCounter.textContent = likeCount.length;
}

//функция отображения карточки
export function addCards(item, userID) {
  const userCard = elementTemplate.querySelector('.element').cloneNode(true);
  const likeButton = userCard.querySelector('.element__button');
  const cardImage = userCard.querySelector('.element__image');
  const cardTitle = userCard.querySelector('.element__text');

  userCard.id = item._id;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardImage.addEventListener('click', function() {openPopupTypeZoom(item.name, item.link)});

  const elementRemoveButton = userCard.querySelector('.element__delete');

  if (userID.id !== item.owner._id) {
    elementRemoveButton.style.display = 'none';
  } else {
    elementRemoveButton.addEventListener('click', () => {
      deleteCardHandler(userCard);
    });
  }

  likeButton.addEventListener('click', () => {
    if (!likeButton.classList.contains('element__button_type_liked')) {
      addLikeHandler(userCard, item, userID);
    } else {
      deleteLikeHandler(userCard, item, userID);
    }
  });
  likeCard(userCard, item.likes, userID);
  return userCard;
}



