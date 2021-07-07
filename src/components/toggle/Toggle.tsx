import React from 'react';
import './Toggle.scss';

const Toggle = ({changeMode}) => {
  return (
    <>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
          onChange={changeMode}
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span className="toggle-switch-inner" data-play="Play" data-train="Train" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    </>
  );
};

export default Toggle;
