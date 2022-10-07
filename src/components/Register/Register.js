import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <form className='register' noValidate>
      <Link to='/' className='register__logo' />
      <h2 className='register__title'>Добро пожаловать!</h2>
      <label className='register__label'>Имя</label>
      <input
        className='register__input'
        placeholder='Введите имя'
        name='name'
        type='text'
        id='name'
        minLength='2'
        maxLength='30'
        required
      />
      <span className='register__input-error'></span>
      <label className='register__label'>E-mail</label>
      <input
        className='register__input'
        placeholder='Введите e-mail'
        name='email'
        type='email'
        id='email'
        required
      />
      <span className='register__input-error'></span>
      <label className='register__label'>Пароль</label>
      <input
        className='register__input'
        placeholder='Введите пароль'
        name='password'
        type='password'
        id='password'
        minLength='8'
        maxLength='30'
        required
      />
      <span className='register__input-error'></span>
      <button className='register__button' type='submit'>
        Зарегистрироваться
      </button>
      <p className='register__caption'>
        Уже зарегистрированы?
        <Link to='/signin' className='register__link'>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;