import { useState } from 'react';

const SearchBar = ({ onSearch, onLocationClick, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <svg 
            className="search-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="search-btn"
          disabled={loading || !city.trim()}
        >
          {loading ? <span className="spinner"></span> : 'Search'}
        </button>

        <button 
          type="button" 
          className="location-btn"
          onClick={onLocationClick}
          disabled={loading}
          title="Use my location"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;