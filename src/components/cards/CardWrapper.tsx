import React, {useEffect} from 'react';
import Cards from './Cards';

const CardWrapper = ({cards, mode, addCategory, addBufferCategory, clickElement}) => {
  // console.log(cards);
  useEffect(() => {
    addCategory(cards);
    addBufferCategory(cards);
  }, []);

  return (
    <>
      {cards.map((card) => (
        <div key={card.id} className="word-card">
          <Cards
            image={card.image}
            sound={card.audioSrc}
            word={card.word}
            id={card.id}
            translation={card.translation}
            mode={mode}
            playGame={clickElement}
          />
        </div>
      ))}
    </>
  );
};
export default CardWrapper;
