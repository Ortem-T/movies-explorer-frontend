import React from 'react';
import './AboutMe.css';
import Photo from '../../images/artem.jpg';

function AboutMe() {
  return (
    <section id='about' className='about'>
      <h2 className='about__title'>Студент</h2>
      <article className='about__article' aria-label='О студенте'>
        <div className='about__article-text'>
          <p className='about__name'>Артем</p>
          <p className='about__profile'>Фронтенд-разработчик, 34 года</p>
          <p className='about__description'>
          Всем привет! Меня зовут Артем. Я живу в городе Подольск. 
          В последние годы я работал по другой специальности, но решил сменить профессию и выбрал Front-end разработку. 
          Сейчас заканчиваю обучение на курсе Веб-разработчик в Я.Практикум. Ищу возможность применить уже полученные знания на практике. 
          В свободное время коллекционирую винил, путешествую на авто, велосипеде или лодке.
          </p>
          <a
            className='about__link'
            href='https://github.com/Ortem-T'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </div>
        <img className='about__image' src={Photo} alt='Фотография' />
      </article>
    </section>
  );
}

export default AboutMe;