// Sidebar.js
import React from 'react';
import '../index.css';

export default function Sidebar({ genres, onGenreSelect, onSort }) {


  
  return (
    <div className='sidebar'>
      <div>
        <h2 className='section'><svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20" fill='BLUE'><path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/></svg>
         Home</h2>
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
