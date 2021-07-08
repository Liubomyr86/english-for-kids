import React, {useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import {useTypedSelector} from '../../hooks/useTypedSelector';
import Cards from './Cards';

const CardWrapper = ({cards, mode, addCategory, addBufferCategory, clickElement}) => {
  // console.log(cards);
  useEffect(() => {
    addCategory(cards);
    addBufferCategory(cards);
  }, []);

  // console.log(asd);
  // const dispatch = useDispatch();
  // const category = useTypedSelector((state) => state.category.playCategory);
  // const addCategory = () => {
  //   dispatch({type: 'ADD_CATEGORY', payload: asd});
  // };
  // console.log(category);
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
