import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar({ data, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      const filteredSuggestions = data.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    onSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    onSearch(suggestion.title);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      setSearchQuery(suggestions[0].title);
      setShowSuggestions(false);
      onSearch(suggestions[0].title);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onClick={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      {searchQuery && (
        <button onClick={handleClear} className="clear-button">
          X {/*insert search icon instead of x*/}
        </button>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(suggestion => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

