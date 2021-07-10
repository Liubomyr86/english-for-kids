import React, {useState} from 'react';
import {getWord, addTrainModeClickToCount} from '../../local-storage/local-storage-wrap';
import './Cards.scss';

const Cards = ({image, sound, word, id, translation, mode, playGame}) => {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  const deleteClassName = () => {
    setActive(false);
  };

  const CLASS_ROTATE_BTN = 'rotate-btn';

  const playAudio = (event, src: string) => {
    if (!event.target.classList.contains(CLASS_ROTATE_BTN)) {
      const audio = new Audio();
      audio.src = src;
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <>
      <div
        className={isActive ? 'card flipped' : 'card'}
        onMouseLeave={deleteClassName}
        onClick={(event) => playGame(event)}>
        <div
          className={mode ? 'card__front cover' : 'card__front'}
          id={word}
          style={{backgroundImage: `url('${image}')`}}
          onClick={(event) => {
            if (!mode) {
              playAudio(event, sound);
              addTrainModeClickToCount(getWord(event));
            }
          }}>
          <h2 className={mode ? 'card-title none' : 'card-title'}>{word}</h2>
        </div>
        <div className="card__back" style={{backgroundImage: `url('${image}')`}}>
          <h2 className={mode ? 'card-title none' : 'card-title'}>{translation}</h2>
        </div>
        <button
          className={mode ? 'rotate-btn none' : 'rotate-btn'}
          id={`card-${id}`}
          type="button"
          onClick={toggleClass}></button>
      </div>
    </>
  );
};

export default Cards;
