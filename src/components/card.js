import {closePopup, popupTypeNewcard, openPopupTypeZoom} from './modal';

//-----------------Добавление новых карточек------------------
export const newCard = document.querySelector('.form_type_new-card');
const elementContainer = document.querySelector('.elements__container');
const templateElement = document.querySelector('.element-template').content;
const imageTitle = document.querySelector('.form__text_type_name');
const imageLink = document.querySelector('.form__text_type_image-link');

function addNewElement (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCards(imageTitle.value, imageLink.value));
  newCard.reset();
  closePopup(popupTypeNewcard);
}

newCard.addEventListener('submit', addNewElement);


 function addCards(title, image) {

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

//------------------Добавление карточек из массива-----------------
export function addCardsFromArray(element) {
  element.forEach(function (item) {
    const card = addCards(item.name, item.link);
    elementContainer.prepend(card);
  });
}



