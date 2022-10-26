import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './Login.css';
import isEmail from 'validator/lib/isEmail';

function Login({ onLogin }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange", });

  function onSubmit({ email, password }) {
    onLogin(email, password);
  }

  return (
    <form className='login' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Link to='/' className='login__logo' />
      <h2 className='login__title'>Рады видеть!</h2>
      <label className='login__label'>E-mail</label>
      <input
        {...register('email', {
          required: true,
          validate: (input) => isEmail(input)
        })
        }
        className='login__input'
        placeholder='Введите e-mail'
        type='email'
        id='email'
      />
      {
        errors.email?.type === 'required' ? <span className='login__input-error'>Поле обязательно для заполнения</span> :
          errors.email?.type === 'validate' ? <span className='login__input-error'>Некорректный E-mail</span> :
            <span className='login__input-error'></span>
      }
      <label className='login__label'>Пароль</label>
      <input
        {...register('password', {
          required: true,
          minLength: 5,
          maxLength: 30,
        })
        }
        className='login__input'
        placeholder='Введите пароль'
        type='password'
        id='password'
      />
      {
        errors.password?.type === 'required' ? <span className='login__input-error'>Поле обязательно для заполнения</span> :
          errors.password?.type === 'minLength' ? <span className='login__input-error'>Пароль должен быть больше 5 символов</span> :
            errors.password?.type === 'maxLength' ? <span className='login__input-error'>Пароль должен быть менее 30 символов</span> :
              <span className='login__input-error'></span>
      }
      <button
        className={!isValid ? 'login__button-disabled' : 'login__button'}
        type='submit'
        disabled={!isValid}
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