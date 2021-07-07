import React from 'react';
import './CardsCategory.scss';
import {NavLink} from 'react-router-dom';

const CategoryCards = ({cards, mode}) => {
  return (
    <>
      {cards.map((card) => (
        <NavLink key={card.id} to={card.path} className="card-wrap">
          <div className={mode ? 'card-top orange' : 'card-top'}>
            <div className="card__img-wrap">
              <img src={card.src} alt={card.title} className="img" />
            </div>
          </div>
          <div className="card-bottom">
            <h2 className="card__title">{card.title}</h2>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default CategoryCards;
