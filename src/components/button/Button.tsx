import React from 'react';
import './Button.scss';

const Button = ({playGame, startPlay, active, reaplay}) => {
  return (
    <div
      className="button-wrapper"
      onClick={
        active
          ? () => reaplay()
          : () => {
            setTimeout(() => {
              playGame();
            }, 500);
          }
      }>
      <button className={active ? 'button repeat' : 'button'} onClick={startPlay} type="button">
        Start game
      </button>
    </div>
  );
};

export default Button;
