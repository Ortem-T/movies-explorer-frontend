import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './Register.css';
import isEmail from 'validator/lib/isEmail';


function Register({ onRegister }) {
  const { register, handleSubmit, formState: { errors, isValid }, } = useForm({ mode: "onChange", });

  function onSubmit({ name, email, password }) {
    onRegister(name, email, password);
  }

  return (
    <form className='register' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Link to='/' className='register__logo' />
      <h2 className='register__title'>Добро пожаловать!</h2>
      <label className='register__label'>Имя</label>
      <input
        {...register('name', {
          required: true,
          minLength: 2,
          maxLength: 30,
          pattern: /^[A-Za-zА-Яа-яЁё /s -]+$/
        })
        }
        className='register__input'
        placeholder='Введите имя'
        type='text'
        id='name'
      />
      {
        errors.name?.type === 'required' ? <span className='register__input-error'>Поле обязательно для заполнения</span> :
          errors.name?.type === 'minLength' ? <span className='register__input-error'>Имя должно быть больше 2 символов</span> :
            errors.name?.type === 'maxLength' ? <span className='register__input-error'>Имя должно быть менее 30 символов</span> :
              <span className='register__input-error'></span>
      }
      <label className='register__label'>E-mail</label>
      <input
        {...register('email', {
          required: true,
          validate: (input) => isEmail(input)
        })
        }
        className='register__input'
        placeholder='Введите e-mail'
        type='email'
        id='email'
      />
      {
        errors.email?.type === 'required' ? <span className='register__input-error'>Поле обязательно для заполнения</span> :
          errors.email?.type === 'validate' ? <span className='register__input-error'>Некорректный E-mail</span> :
            <span className='register__input-error'></span>
      }
      <label className='register__label'>Пароль</label>
      <input
        {...register('password', {
          required: true,
          minLength: 5,
          maxLength: 30,
        })
        }
        className='register__input'
        placeholder='Введите пароль'
        type='password'
        id='password'
      />
      {
        errors.password?.type === 'required' ? <span className='register__input-error'>Поле обязательно для заполнения</span> :
          errors.password?.type === 'minLength' ? <span className='register__input-error'>Пароль должен быть больше 5 символов</span> :
            errors.password?.type === 'maxLength' ? <span className='register__input-error'>Пароль должен быть менее 30 символов</span> :
              <span className='register__input-error'></span>
      }
      <button
        className={!isValid ? 'register__button-disabled' : 'register__button'}
        type='submit' disabled={!isValid}
      >
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