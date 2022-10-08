import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <form className='profile' noValidate>
      <h2 className='profile__title'>Привет, Артем!</h2>
      <fieldset className='profile__fildset'>
        <label className='profile__label'>Имя</label>
        <input
          className='profile__input'
          placeholder='Введите имя'
          name='name'
          type='text'
          id='name'
          minLength='2'
          maxLength='30'
          required
        />
      </fieldset>
      <fieldset className='profile__fildset'>
        <label className='profile__label'>E-mail</label>
        <input
          className='profile__input'
          placeholder='Введите e-mail'
          name='email'
          type='email'
          id='email'
          required
        />
      </fieldset>
      <button className='profile__edit-button' type='button'>
        Редактировать
      </button>
      <Link to='/' className='profile__logout-link'>
        Выйти из аккаунта
      </Link>
    </form>
  );
}

export default Profile;