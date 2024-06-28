// Sidebar.js
import React from 'react';
import '../index.css';

export default function Sidebar({ genres, onGenreSelect }) {
  return (
    <div className='sidebar'>
      <div>
        <h2>Genres</h2>
      </div>
      <ul>
        {genres.map((genre, index) => (
          <li key={index} onClick={() => onGenreSelect(genre)}>{genre}</li>
        ))}
      </ul>
      <h2>New Podcasts</h2>
      <ul>
        <li>Podcast 1</li>
        <li>Podcast 2</li>
        <li>Podcast 3</li>
        <li>Podcast 4</li>
      </ul>
    </div>
  );
}
