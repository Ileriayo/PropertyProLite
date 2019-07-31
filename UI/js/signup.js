/* eslint-disable no-fallthrough */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const url = {
  signup: 'https://propertyproo.herokuapp.com/api/v1/auth/signup',
};

const form = document.querySelector('#form');

const postRequest = (urlString, data) => fetch(urlString, {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  redirect: 'follow',
  body: JSON.stringify(data),
});

const formPost = async (e) => {
  const first_name = document.querySelector('#fname').value;
  const last_name = document.querySelector('#lname').value;
  const email = document.querySelector('#email').value;
  const address = document.querySelector('#address').value;
  const phone_number = document.querySelector('#phone_number').value;
  const password = document.querySelector('#password').value;
  const confirm_password = document.querySelector('#confirm_password').value;

  const fname_error = document.querySelector('#fname_error');
  const lname_error = document.querySelector('#lname_error');
  const email_error = document.querySelector('#email_error');
  const phone_number_error = document.querySelector('#phone_number_error');
  const address_error = document.querySelector('#address_error');
  const password_error = document.querySelector('#password_error');
  const confirm_password_error = document.querySelector('#confirm_password_error');

  await e.preventDefault();

  try {
    const res = await postRequest(url.signup, {
      first_name, last_name, email, password: confirm_password, address, phone_number,
    });
    const data = await res.json();

    const errorString = value => data.error.find(errorStr => errorStr.startsWith(value));

    fname_error.textContent = '';
    lname_error.textContent = '';
    email_error.textContent = '';
    address_error.textContent = '';
    password_error.textContent = '';
    phone_number_error.textContent = '';
    confirm_password_error.textContent = '';

    if (res.status === 400) {
      if (errorString('First name')) fname_error.textContent = `${errorString('First name')}`;
      if (errorString('Last name')) lname_error.textContent = `${errorString('Last name')}`;
      if (errorString('Email')) email_error.textContent = `${errorString('Email')}`;
      if (errorString('Address')) address_error.textContent = `${errorString('Address')}`;
      if (errorString('Password')) password_error.textContent = `${errorString('Password')}`;
      if (errorString('Phone')) phone_number_error.textContent = `${errorString('Phone')}`;
    }

    if (res.status === 409) email_error.textContent = `${data.error}`;

    if (confirm_password !== password) {
      password_error.textContent = 'Password does not match';
    }

    if (res.ok) {
      window.location.href = '../UI/user/all_properties.html';
    }
  } catch (err) {
    // return err;
  }
};

form.addEventListener('submit', formPost);
