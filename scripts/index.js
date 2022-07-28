//---------------Открытие/Закрытие модальных окон---------------
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeNewcard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeZoom = document.querySelector('.popup_type_zoom');
const closeButtonProfile = document.querySelector('.close-button_profile');
const closeButtonNewcard = document.querySelector('.close-button_new-card');
const closeButtonZoom = document.querySelector('.popup__close-button_zoom-image');

function openPopup(popup) {popup.classList.add('popup_opened')};
profileEditButton.addEventListener('click', function() {openPopup(popupTypeProfile)});
profileAddButton.addEventListener('click', function() {openPopup(popupTypeNewcard)});

function closePopup(popup) {popup.classList.remove('popup_opened')};
closeButtonProfile.addEventListener('click', function(){closePopup(popupTypeProfile)});
closeButtonNewcard.addEventListener('click', function(){closePopup(popupTypeNewcard)});
closeButtonZoom.addEventListener('click', function(){closePopup(popupTypeZoom)});


//--------------------Готовый массив карточек-------------------
const initialCards = [
  {
    name: 'Дворы центрального района Санкт-Петербурга',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/1671180/pub_5e6de84a4f80686f3cb6f394_5e6dec632a0aa97f0bf5074c/scale_1200'
  },
  {
    name: 'Парадная',
    link: 'https://sun9-23.userapi.com/xn6ZlCyTt_22GJ0rE-LzJXJ-tSWyd88t3vP2ww/z9prKXIdawc.jpg'
  },
  {
    name: 'Вид с крыш',
    link: 'https://i01.fotocdn.net/s129/464ab7c2080e10ca/public_pin_l/2917810206.jpg'
  },
  {
    name: 'Двор-Колодец',
    link: 'https://pro-dachnikov.com/uploads/posts/2021-10/1633327441_23-p-dom-stena-v-sankt-peterburge-vnutri-foto-26.jpg'
  },
  {
    name: 'Набережная',
    link: 'http://rasfokus.ru/images/photos/medium/55a7a8e067e55120ee8f962547932a8c.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://travelask.ru/system/images/files/000/322/386/wysiwyg/fR0Kajg5gM0.jpg?1500040314'
  }
];


//----------------Редактирование профиля---------------
const firstname = document.querySelector('.form__text_type_firstmane');
const description = document.querySelector('.form__text_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formTypeProfile = document.querySelector('.form_type_profile');

function formSubmitHandler (evt) {
  evt.preventDefault();
  firstname.getAttribute('value');
  description.getAttribute('value');
  profileTitle.textContent = firstname.value;
  profileSubtitle.textContent = description.value;
  closePopup (popupTypeProfile);
}
formTypeProfile.addEventListener('submit', formSubmitHandler);


//-----------------Добавление новых карточек------------------
const newCard = document.querySelector('.form_type_new-card');
const elementContainer = document.querySelector('.elements__container');
const templateElement = document.querySelector('.element-template').content;
const imageTitle = document.querySelector('.form__text_type_name');
const imageLink = document.querySelector('.form__text_type_image-link');

function addNewElement (evt) {
  evt.preventDefault();
  elementContainer.prepend(addCards(imageTitle.value, imageLink.value));
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
function addCardsFromArray(element) {
  element.forEach(function (item) {
    const card = addCards(item.name, item.link);
    elementContainer.prepend(card);
  });
}
addCardsFromArray(initialCards);

//------------Открытие маодального окна с разными карточками------------
const zoomImage = document.querySelector('.popup__zoom-image');
const zoomImageTitle = document.querySelector('.popup__zoom-title');
function openPopupTypeZoom(title, image) {
  zoomImage.src = image;
  zoomImage.alt = title;
  zoomImageTitle.textContent = title;
  openPopup(popupTypeZoom);
}


