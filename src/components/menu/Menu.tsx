import React from 'react';
import './Menu.scss';
import {NavLink} from 'react-router-dom';

const Menu = ({items, active, showMenu, mode}): JSX.Element => {
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
              <NavLink to="/" exact>
                Main Page
              </NavLink>
            </li>
            {items.map((item) => (
              <li key={item.id} className="menu-item">
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            ))}
            {/* <li className="menu-item">
              <Link to="/stats">Statistics</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Menu;
