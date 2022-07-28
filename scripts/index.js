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


//----------------Редактирование профиля---------------
const firstname = document.querySelector('.form__text_type_firstmane');
const description = document.querySelector('.form__text_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formTypeProfile = document.querySelector('.form_type_profile');

function editProfileForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = firstname.value;
  profileSubtitle.textContent = description.value;
  closePopup (popupTypeProfile);
}
formTypeProfile.addEventListener('submit', editProfileForm);


//-----------------Добавление новых карточек------------------
const newCard = document.querySelector('.form_type_new-card');
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


