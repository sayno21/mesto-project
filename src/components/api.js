import {checkRes} from './utilits';
// export function foo () {console.log('Hello World!')};
// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
//   headers: {
//     authorization: 'dc2806aa-bc50-428a-950b-3abd500234a6',
//     'Content-Type': 'application/json'
//   }
// };

//Загрузка карточек с сервера
// return fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
//   headers: {
//     authorization: 'c977941d-c8c4-4145-ba23-754c541f6927'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });


//Загрузка информации о пользователе с сервера


fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me', {
  headers: {
    authorization: 'c977941d-c8c4-4145-ba23-754c541f6927'
  }
})
  .then((res) => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(res.status);
  })
  .then((res) => {
    console.log(res.name);
    renderResult(res.name);
  });

  function renderResult(text) {
    const firstname = document.querySelector('.profile__title');
    firstname.textContent = text;
  }


