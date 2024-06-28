import React, { useState, useEffect, useRef } from 'react';
import "../index.css";
import Sidebar from './Sidebar';
import genreMapping from '../Helpers/GenreMapping';
import TruncateText from '../Helpers/TruncateText';
import Navbar from './Navbar';
import GenreButtons from './genreButtons';

export default function FetchRequest() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const hoverTimer = useRef(null);
  const slideshowTimer = useRef(null);

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

  useEffect(() => {
    if (!hoveredItem) {
      hoverTimer.current = setTimeout(() => {
        setIsSlideshowActive(true);
      }, 5000); // Start slideshow after 5 seconds of no hover
    } else {
      clearTimeout(hoverTimer.current);
      setIsSlideshowActive(false);
    }
    return () => clearTimeout(hoverTimer.current);
  }, [hoveredItem]);

  useEffect(() => {
    if (isSlideshowActive) {
      slideshowTimer.current = setInterval(() => {
        setSlideshowIndex(prevIndex => (prevIndex + 1) % data.length);
      }, 4000); // Change slide every 3 seconds
    } else {
      clearInterval(slideshowTimer.current);
    }
    return () => clearInterval(slideshowTimer.current);
  }, [isSlideshowActive, data.length]);

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

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const filteredData = data.filter(post => {
    const matchesGenre = selectedGenre ? post.genres.some(genreId => genreMapping[genreId] === selectedGenre) : true;
    const matchesSearch = searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesGenre && matchesSearch;
  }).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const uniqueGenres = [
    ...new Set(data.flatMap(post => post.genres.map(genreId => genreMapping[genreId])))
  ];

  return (
    <div className="container">
      <Navbar podcasts={data} onSearch={handleSearch} />
      <Sidebar onSort={handleSort} />
      <div className="main-content">
        <GenreButtons genres={uniqueGenres} onGenreSelect={handleGenreSelect} selectedGenre={selectedGenre} />
        {loading && <p className='loading-sts'></p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && filteredData.length > 0 && (
          <>
            <div className="preview-background" style={{ backgroundImage: isSlideshowActive && data.length > 0 ? `url(${data[slideshowIndex].image})` : hoveredItem ? `url(${hoveredItem.image})` : 'none' }}>
              {hoveredItem && !isSlideshowActive && (
                <div className="hoverDetails">
                  <h4>{hoveredItem.title}</h4>
                  <TruncateText text={hoveredItem.description} maxLength={250} />
                  <p>Seasons: {hoveredItem.seasons}</p>
                  <p>Episodes: {hoveredItem.episode}</p>
                  <p>{hoveredItem.genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                  <p>Last Updated: {new Date(hoveredItem.updated).toLocaleDateString()}</p>
                </div>
              )}
              {isSlideshowActive && data.length > 0 && (
                <div className="hoverDetails">
                  <h4>{data[slideshowIndex].title}</h4>
                  <TruncateText text={data[slideshowIndex].description} maxLength={250} />
                  <p>Seasons: {data[slideshowIndex].seasons}</p>
                  <p>Episodes: {data[slideshowIndex].episode}</p>
                  <p>{data[slideshowIndex].genres.map(genreId => genreMapping[genreId]).join(', ')}</p>
                  <p>Last Updated: {new Date(data[slideshowIndex].updated).toLocaleDateString()}</p>
                </div>
              )}
            </div>
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
