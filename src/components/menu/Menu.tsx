import React from 'react';
import './Menu.scss';
import {NavLink} from 'react-router-dom';

const Menu = ({items, active, showMenu, mode, changeMode}): JSX.Element => {
  const stopPropagination = (event) => event.stopPropagation();

  return (
    <>
      <div className={active ? 'menu opened' : 'menu'} onClick={showMenu}>
        <div className="blur"></div>
        <nav
          className={mode ? 'menu-items-wrap orange' : 'menu-items-wrap'}
          onClick={stopPropagination}>
          <ul className="menu-items" onClick={showMenu}>
            <li className="menu-item">
              <NavLink to="/" exact onClick={changeMode}>
                Main Page
              </NavLink>
            </li>
            {items.map((item) => (
              <li key={item.id} className="menu-item" onClick={changeMode}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            ))}
            <li className="menu-item">
              <NavLink to="/stats" onClick={changeMode}>
                Statistics
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Menu;
