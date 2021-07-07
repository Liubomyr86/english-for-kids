import React from 'react';
import './HamburgerButton.scss';

const HamburgerButton = ({active, showMenu}) => {
  return (
    <>
      <div className={active ? 'menu-toggle active' : 'menu-toggle'} onClick={showMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </>
  );
};

export default HamburgerButton;
