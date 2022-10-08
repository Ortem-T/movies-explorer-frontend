import React from 'react';
// import { Link } from 'react-router-dom';
import './Promo.css';
import landingLogoImg from '../../images/landing_logo.svg'
const title = 'Учебный проект студента факультета \n Веб-разработки.'

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <img className="promo__logo" src={landingLogoImg} alt="Логотип" />
        <h1 className='promo__title'>
          {title}
        </h1>
        <h2 className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </h2>
        <a href='#about-project' className='promo__link'>
          Узнать больше
        </a>
      </div>
    </section >
  );
}

export default Promo;