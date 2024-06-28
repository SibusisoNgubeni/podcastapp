import React from 'react'

export default function GenreButtons({ genres, onGenreSelect }) {
  return (
    <div className="genre-btns">
    {genres.map((genre, index) => (
      <button key={index} className="genre-btn" onClick={() => onGenreSelect(genre)}>
        {genre}
      </button>
    ))}
  </div>

  );
}
