import React from 'react';
import {useLocation} from 'react-router-dom';
import './Button.scss';

const Button = ({playGame}) => {
  // const locat = useLocation();
  return (
    <div className="button-wrapper">
      <button className="button" onClick={() => playGame()} type="button">
        Start game
      </button>
    </div>
  );
};

export default Button;
