// Sidebar.js
import React from 'react';
import '../index.css';

export default function Sidebar({ genres, onGenreSelect, onSort }) {


  
  return (
    <div className='sidebar'>
      <div>
        <h2 className='section'>Home</h2>
        <p>All shows</p>
        <h2 className='section'>For you</h2>
        <p> Favourites</p>
        <p> Suggested for you</p>
        <h2>Genres</h2>
      </div>
    
      <div className="sort-options">
        <button onClick={() => onSort('asc')}>Sort A-Z</button>
        <button onClick={() => onSort('desc')}>Sort Z-A</button>
      </div>
      
    </div>
  );
}
