import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__container'>
        <p className='footer__copyright'>&copy; {year}</p>
        <ul className='footer__links'>
          <li>
            <a
              className='footer__link'
              href='https://practicum.yandex.ru'
              target='_blank'
              rel='noopener noreferrer'
            >
              Тарасов Артем
            </a>
          </li>
          <li>
            <a
              className='footer__link'
              href='https://github.com/Ortem-T'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
