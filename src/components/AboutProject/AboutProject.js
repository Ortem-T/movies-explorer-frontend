import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <ul className='about-project__list about-project__list_columns'>
        <li>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about-project__list about-project__list_lines'>
        <li>
          <p className='about-project__line about-project__line_one'>1 неделя</p>
          <p className='about-project__caption'>Back-end</p>
        </li>
        <li>
          <p className='about-project__line about-project__line_two'>4 недели</p>
          <p className='about-project__caption'>Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;