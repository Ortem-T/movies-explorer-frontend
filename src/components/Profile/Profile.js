import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import isEmail from 'validator/lib/isEmail';

function Profile({ handleUpdateUser, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange", defaultValues: { name: currentUser.name || '', email: currentUser.email || '' }
  });

  function onSubmit({ name, email }) {
    handleUpdateUser(name, email);
  }
  return (
    <form className='profile' onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
      <fieldset className='profile__fildset'>
        <label className='profile__label'>Имя</label>
        <div className='profile__input-cover'>
          <input
            {...register('name', {
              required: 'Поле обязательно для заполнения',
              minLength: 2,
              maxLength: 30,
              pattern: /^[A-Za-zА-Яа-яЁё /s -]+$/,
            })
            }
            className='profile__input'
            placeholder='Введите имя'
            type='text'
            id='name'
          />
          {
            errors.name?.type === 'required' ? <span className='profile__input-error'>Поле обязательно для заполнения</span> :
              errors.name?.type === 'minLength' ? <span className='profile__input-error'>Имя должно быть больше 2 символов</span> :
                errors.name?.type === 'maxLength' ? <span className='profile__input-error'>Имя должно быть менее 30 символов</span> :
                  <span className='profile__input-error'></span>
          }
        </div>
      </fieldset>
      <fieldset className='profile__fildset'>
        <label className='profile__label'>E-mail</label>
        <div className='profile__input-cover'>
          <input
            {...register('email', {
              required: true,
              validate: (input) => isEmail(input)
            })
            }
            className='profile__input'
            placeholder='Введите e-mail'
            type='email'
            id='email'
          />
          {
            errors.email?.type === 'required' ? <span className='profile__input-error'>Поле обязательно для заполнения</span> :
              errors.email?.type === 'validate' ? <span className='profile__input-error'>Некорректный E-mail</span> : 
              <span className='profile__input-error'></span>
          }
        </div>
      </fieldset>
      <button
        className={!isValid ? 'profile__edit-button-disabled' : 'profile__edit-button'}
        type='submit'
        disabled={!isValid}
      >
        Редактировать
      </button>
      <Link to='/' className='profile__logout-link' onClick={handleSignOut}>
        Выйти из аккаунта
      </Link>
    </form>
  );
}

export default Profile;