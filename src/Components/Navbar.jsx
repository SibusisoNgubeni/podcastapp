import React, { useState } from 'react';
import '../index.css';
import SettingsModal from './SettingsModal';
import SearchBar from './Searchbar';

export default function Navbar({ podcasts, onSearch }) {
  return (
    <div className="Navbar">
      <div>
        <img className="logoimg" src="./SRC/ASSETS/IMAGES/BADPODCAST-DARKBG.PNG" alt="Logo" />
      </div>
      <SearchBar data={podcasts} onSearch={onSearch} />
      <SettingsModal />
    </div>
  );
}
