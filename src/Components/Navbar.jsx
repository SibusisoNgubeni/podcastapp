import React, { useState } from 'react';
import '../index.css';
import SettingsModal from './SettingsModal';
import SearchBar from './Searchbar';

export default function Navbar({ podcasts, onSearch }) {
  return (
    <div className="Navbar">
      <div>
        <img className="logoimg" src="/badpodcast-darkbg.png" alt="Logo" />
      </div>
      <SearchBar data={podcasts} onSearch={onSearch} />
      <SettingsModal />
    </div>
  );
}
