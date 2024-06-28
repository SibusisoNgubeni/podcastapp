import React, { useState, useEffect } from 'react';
import "../index.css";
import Sidebar from './Sidebar';
import genreMapping from '../Helpers/GenreMapping';
import TruncateText from '../Helpers/TruncateText';
import Navbar from './Navbar';

export default function FetchRequest() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setData(sortedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setHoveredItem(null); // Reset hovered item when genre changes
  };

  const handleMouseEnter = (post) => {
    setHoveredItem(post);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = data.filter(post => {
    const matchesGenre = selectedGenre ? post.genres.some(genreId => genreMapping[genreId] === selectedGenre) : true;
    const matchesSearch = searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesGenre && matchesSearch;
  });

  const uniqueGenres = [
    ...new Set(data.flatMap(post => post.genres.map(genreId => genreMapping[genreId])))
  ];

  return (
    <div className="container">
      <Navbar podcasts={data} onSearch={handleSearch} />
      <Sidebar genres={uniqueGenres} onGenreSelect={handleGenreSelect} />
      <div className="main-content">
        {loading && <p className='loading-sts'></p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && filteredData.length > 0 && (
          <>
            {/* Preview Background and Details */}
            <div className="preview-background" style={{ backgroundImage: hoveredItem ? `url(${hoveredItem.image})` : 'none' }}>
              {hoveredItem && (
                <div className="hoverDetails">
                  <h4>{hoveredItem.title}</h4>
                  <TruncateText text={hoveredItem.description} maxLength={250} />
                  <p>Seasons: {hoveredItem.seasons}</p>
                  <p>Episodes: {hoveredItem.episode}</p>
                  <p>{hoveredItem.genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                  <p>Last Updated: {new Date(hoveredItem.updated).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {/* Main List of Podcasts */}
            <div className="list-items">
              <h2>{selectedGenre ? `${selectedGenre}` : 'All Shows'}</h2>
              <ul className="horizontal-scroll">
                {filteredData.map(post => (
                  <li key={post.id} onMouseEnter={() => handleMouseEnter(post)}>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <div className="text-content">
                      <h5>{post.title}</h5>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {!error && filteredData.length === 0 && !loading && (
          <div className="no-results">No results found</div>
        )}
      </div>
    </div>
  );
}
