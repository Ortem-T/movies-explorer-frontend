import React from 'react';
import './Portfolio.css';
import ArrowImg from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            href='https://ortem-t.github.io/how-to-learn/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Статичный сайт
            <img className='portfolio__image' src={ArrowImg} alt='Ссылка на сайт' />
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            href='https://ortem-t.github.io/russian-travel/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Адаптивный сайт
            <img className='portfolio__image' src={ArrowImg} alt='Ссылка на сайт' />
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            href='https://ortem-t.github.io/mesto/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Одностраничное приложение
            <img className='portfolio__image' src={ArrowImg} alt='Ссылка на сайт' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;