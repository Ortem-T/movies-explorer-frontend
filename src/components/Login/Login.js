import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <form className='login' onSubmit={handleSubmit} noValidate>
      <Link to='/' className='login__logo' />
      <h2 className='login__title'>Рады видеть!</h2>
      <label className='login__label'>E-mail</label>
      <input
        onChange={handleEmailChange}
        className='login__input'
        placeholder='Введите e-mail'
        name='email'
        type='email'
        id='email'
        required
      />
      <span className='login__input-error'></span>
      <label className='login__label'>Пароль</label>
      <input
        onChange={handlePasswordChange}
        className='login__input'
        placeholder='Введите пароль'
        name='password'
        type='password'
        id='password'
        minLength='8'
        maxLength='30'
        required
      />
      <span className='login__input-error'></span>
      <button
        className='login__button'
        type='submit'
      >
        Войти
      </button>
      <p className='login__caption'>
        Еще не зарегистрированы?
        <Link to='/signup' className='login__link'>
          Регистрация
        </Link>
      </p>
    </form>
  );
}

export default Login;