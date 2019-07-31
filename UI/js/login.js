/* eslint-disable no-fallthrough */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const url = {
  signin: 'https://propertyproo.herokuapp.com/api/v1/auth/signin',
};

const form = document.querySelector('#form');

const postRequest = (urlString, data) => fetch(urlString, {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  redirect: 'follow',
  body: JSON.stringify(data),
});

const formPost = async (e) => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const email_error = document.querySelector('#email_error');
  const password_error = document.querySelector('#password_error');
  const login_error = document.querySelector('#login_error');

  await e.preventDefault();

  try {
    const res = await postRequest(url.signin, {
      email, password,
    });
    const data = await res.json();

    email_error.textContent = '';
    password_error.textContent = '';
    login_error.textContent = '';

    const errorString = value => data.error.find(errorStr => errorStr.startsWith(value));

    if (res.status === 400) {
      if (errorString('Email')) email_error.textContent = `${errorString('Email')}`;
      if (errorString('Password')) password_error.textContent = `${errorString('Password')}`;
    }

    if (res.status === 401) login_error.textContent = `${data.error}`;
    if (res.ok) {
      window.location.href = '../UI/user/all_properties.html';
    }
  } catch (err) {
    // return err;
  }
};

form.addEventListener('submit', formPost);
