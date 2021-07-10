import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom';
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
import {Footer} from './components/footer/Footer';
import {Modal} from './components/modal/Modal';
import StatisticPage from './components/statistic/Statistic';
import {
  getWord,
  addCorrectClickToCount,
  addWrongClickToCount,
} from './local-storage/local-storage-wrap';

const App: React.FC = () => {
  const INACTIV_CLASS = 'inactive';
  const CORRECT_SOUND = '../assets/correct.mp3';
  const LOSE_SOUND = '../assets/lose.mp3';
  const SUCCESS_SOUND = '../assets/success.mp3';
  const ERROR_SOUND = '../assets/error.mp3';

  const [menuActive, setMenuActive] = useState(false);
  const [activeCardsCategory, setCardsCategory] = useState([]);
  const [bufferCardsCategory, setBufferCategory] = useState([]);
  const [answersArray, updateAnswersArray] = useState([]);
  const [startGame, setGame] = useState(false);
  const [curentWord, setCurentWord] = useState('');
  const [playWord, setPlayWord] = useState('');
  const [errorsArray, setErrorsArray] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [winnerOrLoser, setWinnerOrLoser] = useState(false);
  const [difficultWords, setDifficultWords] = useState([]);

  const showMenu = () => setMenuActive(!menuActive);
  const startPlay = () => setGame(true);

  const dispatch = useDispatch();
  const mode = useTypedSelector((state) => state.mode.actionMode);
  const changeMode = () => {
    dispatch({type: 'isPlay'});
    setGame(false);
    setBufferCategory(activeCardsCategory);
    updateAnswersArray([]);
    setErrorsArray([]);
  };

  const changeMenuItem = () => {
    // dispatch({type: 'isPlay'});
    setGame(false);
    setBufferCategory(activeCardsCategory);
    updateAnswersArray([]);
    setErrorsArray([]);
  };

  const history = useHistory();
  console.log(history)
  const locationPath = window.location.pathname !== '/';

  const playAudio = (src: string) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  };

  const reaplay = () => {
    playAudio(playWord);
  };

  const answers = (result) => {
    const curentAnswer = [...answersArray];
    curentAnswer.push(result);
    updateAnswersArray(curentAnswer);
  };

  const errors = (result) => {
    const curentError = [...errorsArray];
    curentError.push(result);
    setErrorsArray(curentError);
  };

  const initGame = () => {
    const curentCards = [...bufferCardsCategory];
    const shuffledCards = curentCards.sort(() => Math.random() - 0.5);
    const activeCard = shuffledCards.pop();
    const sound = activeCard.audioSrc;
    const {word} = activeCard;
    playAudio(sound);
    setBufferCategory(shuffledCards);
    setPlayWord(sound);
    setCurentWord(word);
  };

  const playGame = (event) => {
    const {target} = event;
    const disabler = target.classList.contains(INACTIV_CLASS);
    const clickedWord = target.childNodes[0].innerHTML;
    if (startGame && mode && clickedWord === curentWord) {
      addCorrectClickToCount(getWord(event));
      if (bufferCardsCategory.length) {
        target.classList.add(INACTIV_CLASS);
        answers(true);
        playAudio(CORRECT_SOUND);
        setTimeout(() => {
          initGame();
        }, 1000);
      } else if (errorsArray.length) {
        target.classList.add(INACTIV_CLASS);
        answers(true);
        playAudio(CORRECT_SOUND);
        setTimeout(() => {
          playAudio(LOSE_SOUND);
        }, 500);
        setEndGame(true);
        setWinnerOrLoser(false);
        setTimeout(() => {
          // window.location.href = '/';
          <Redirect to='/'/>;
        }, 3000);
      } else {
        target.classList.add(INACTIV_CLASS);
        answers(true);
        playAudio(CORRECT_SOUND);
        setTimeout(() => {
          playAudio(SUCCESS_SOUND);
        }, 500);
        setEndGame(true);
        setWinnerOrLoser(true);
        setTimeout(() => {
          // window.location.href = '/';
        <Redirect to='/'/>;
        }, 3000);
      }
    } else if (!disabler && startGame && mode) {
      addWrongClickToCount(getWord(event));
      errors('error');
      answers(false);
      playAudio(ERROR_SOUND);
    }
  };
  return (
    <>
      <Router>
        <div className="container">
          <header className="header">
            <HamburgerButton showMenu={showMenu} active={menuActive} />
            <Menu
              active={menuActive}
              items={cards}
              showMenu={showMenu}
              mode={mode}
              changeMode={changeMenuItem}
            />
            <Toggle changeMode={changeMode} />
          </header>
          <main className="main">
            <Modal flag={endGame} winner={winnerOrLoser} count={errorsArray} />
            <div className={endGame ? 'cards-container none' : 'cards-container'}>
              <div className={mode ? 'score' : 'score none'}>
                {answersArray.map((elem, index) => (
                  <div key={index} className={elem ? 'star-succes' : 'star-error'} />
                ))}
              </div>
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
                      addBufferCategory={setBufferCategory}
                      clickElement={playGame}
                    />
                  </Route>
                ))}
                <Route path="/stats">
                  <StatisticPage setDifficultWords={setDifficultWords} />
                </Route>
                <Route path="/repeat">
                  <CardWrapper
                    cards={difficultWords}
                    mode={mode}
                    addCategory={setCardsCategory}
                    addBufferCategory={setBufferCategory}
                    clickElement={playGame}
                  />
                </Route>
              </Switch>
              {locationPath && mode && (
                <Button
                  playGame={initGame}
                  startPlay={startPlay}
                  active={startGame}
                  reaplay={reaplay}
                />
              )}
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
