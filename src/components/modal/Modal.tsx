import React from 'react';
import './Modal.scss';

export const Modal = ({flag, winner, count}) => {
  const FAILURE = '../assets/img/failure.jpg';
  const SUCCESS = '../assets/img/success.jpg';
  const FAILURE_TITLE = 'You lost, try again next time';
  const SUCCESS_TITLE = 'Congratulations, you won';
  const TRUE_TITLE = flag ? SUCCESS_TITLE : FAILURE_TITLE;
  const FALSE_TITLE = flag ? FAILURE_TITLE : SUCCESS_TITLE;
  const TRUE_IMAGE = flag ? SUCCESS : FAILURE;
  const FALSE_IMAGE = flag ? FAILURE : SUCCESS;

  return (
    <>
      <div className={flag ? 'modal-wrapper' : 'none'}>
        <p className="modal-title">{winner ? TRUE_TITLE : FALSE_TITLE}</p>
        <img src={winner ? TRUE_IMAGE : FALSE_IMAGE} alt="" className="modal-img" />
        <p className="error-count">{winner ? '' : `Errors: ${count.length}`}</p>
      </div>
    </>
  );
};
