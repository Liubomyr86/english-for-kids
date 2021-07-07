import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import throttle from 'lodash.throttle';
import {useDispatch} from 'react-redux';
import Menu from './components/menu/Menu';
import HamburgerButton from './components/hamburgerButton/HamburgerButton';
import Toggle from './components/toggle/Toggle';
import CategoryCards from './components/cardsCategory/CardsCategory';
import CardWrapper from './components/cards/CardWrapper';
import Button from './components/button/Button';

import cards from './data/cardsCategory';
import {useTypedSelector} from './hooks/useTypedSelector';

const App: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [activeCardsCategory, setCardsCategory] = useState([]);
  const [speakWord, setSpeakWord] = useState('');

  const showMenu = () => setMenuActive(!menuActive);
  // const showMenuThrottled = throttle(setMenuActive(!menuActive), 1000);

  const dispatch = useDispatch();
  const mode = useTypedSelector((state) => state.mode.actionMode);
  const changeMode = () => {
    dispatch({type: 'isPlay'});
  };

  // const location = useLocation();
  // console.log(location.pathname);
  console.log(activeCardsCategory);
  console.log(speakWord);
  // const category = useTypedSelector(state => state.category.playCategory);
  // const addCategory = () => {
  //   dispatch({type:'ADD_CATEGORY', payload: cards})

  // }
  // console.log(category);
  // const locationPath = locat.pathname !== '/';

  const initGame = () => {
    const playAudio = (src: string) => {
      const audio = new Audio();
      audio.src = src;
      audio.currentTime = 0;
      audio.play();
    };

    const curentCards = [...activeCardsCategory];
    const shuffledCards: any = curentCards.sort(() => Math.random() - 0.5);

    // console.log(shuffledCards)
    const activeCard: any = shuffledCards.pop();

    const sound = activeCard.audioSrc;
    const {word} = activeCard;
    playAudio(sound);
    // console.log(word);
    setCardsCategory(shuffledCards);
    // console.log(activeCardsCategory)
    setSpeakWord(word);
    // console.log(speakWord)
  };

  const playGame = (event) => {
    const {target} = event;
    const clickedWord = target.childNodes[0].innerHTML;
    console.dir(event.target);
    if (activeCardsCategory.length + 1 > 0) {
      if (clickedWord === speakWord) {
        target.style.opacity = '.5';
        initGame();
      }
    }
  };
  return (
    <>
      <Router>
        <div className="container">
          <header className="header">
            <HamburgerButton showMenu={showMenu} active={menuActive} />
            <Menu active={menuActive} items={cards} showMenu={showMenu} mode={mode} />
            <Toggle changeMode={changeMode} />
          </header>
          <main className="main">
            <div className="cards-container">
              <Switch>
                <Route path="/" exact>
                  <CategoryCards cards={cards} mode={mode} />
                </Route>
                {cards.map((card) => (
                  <Route key={card.id} path={card.path}>
                    <CardWrapper
                      cards={card.cards}
                      mode={mode}
                      addCategory={setCardsCategory}
                      activeCards={activeCardsCategory}
                      clickElement={playGame}
                    />
                  </Route>
                ))}
              </Switch>
              {/* {locationPath && mode && <Button playGame={initGame} />} */}
              {mode && <Button playGame={initGame} />}
            </div>
          </main>
        </div>
      </Router>
    </>
  );
};

export default App;
