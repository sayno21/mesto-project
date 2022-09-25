import {openPopupTypeZoom} from './index';

//-----------------Добавление новых карточек------------------

const templateElement = document.querySelector('.element-template').content;


export function addCards(title, image) {

  const userCard = templateElement.cloneNode(true);
  const cardImage = userCard.querySelector('.element__image');
  cardImage.src = image;
  cardImage.alt = title;
  userCard.querySelector('.element__text').textContent = title;
  cardImage.addEventListener('click', function() {openPopupTypeZoom(title, image)});

    //-----Удаление карточки-----
    function elementDelete (evt) {evt.target.closest('.element').remove()};
    userCard.querySelector('.element__delete').addEventListener('click', elementDelete);
    //-----Лайк карточки------
    function elementLike (evt) {evt.target.classList.toggle('element__button_type_liked')};
    userCard.querySelector('.element__button').addEventListener('click', elementLike);

  return userCard;
}



