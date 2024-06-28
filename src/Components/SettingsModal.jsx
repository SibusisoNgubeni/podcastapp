import React, { useState } from 'react';
import Themes from './Themes';


const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('day');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className="modal-btn" onClick={openModal}> Settings</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Settings</h2>
            <form>
            <label for="theme">Theme:</label>
              <Themes/>
              
            </form>
            
            <div className="modal-footer">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;