import { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import useWeather from './hooks/useWeather';
import './App.css';

function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    searchCity,
    getLocationWeather,
    clearError
  } = useWeather();

  // Load default city on mount
  useEffect(() => {
    searchCity('New York');
  }, []);

  // Dynamic background based on weather
  const getBackgroundClass = () => {
    if (!weather) return 'bg-default';
    
    const condition = weather.weather[0].main.toLowerCase();
    const isNight = weather.weather[0].icon.includes('n');

    if (isNight) return 'bg-night';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'bg-rainy';
    if (condition.includes('cloud')) return 'bg-cloudy';
    if (condition.includes('snow')) return 'bg-snowy';
    if (condition.includes('thunder')) return 'bg-stormy';
    if (condition.includes('clear')) return 'bg-sunny';
    
    return 'bg-default';
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">🌤️ Weather App</h1>
          <p className="subtitle">Get real-time weather updates for any city</p>
        </header>

        {/* Search Bar */}
        <SearchBar
          onSearch={searchCity}
          onLocationClick={getLocationWeather}
          loading={loading}
        />

        {/* Error Message */}
        {error && <ErrorMessage message={error} onClose={clearError} />}

        {/* Loading State */}
        {loading && <Loading />}

        {/* Weather Content */}
        {!loading && weather && (
          <main className="weather-content">
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
            <Forecast forecast={forecast} />
          </main>
        )}

        {/* Empty State */}
        {!loading && !weather && !error && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>Search for a city to see weather information</p>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>Powered by OpenWeatherMap API • Built with React + Vite</p>
        </footer>
      </div>
    </div>
  );
}

export default App;