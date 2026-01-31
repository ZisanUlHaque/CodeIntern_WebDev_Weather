import { getIconUrl } from '../services/weatherApi';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    sys: { country },
    main: { temp, feels_like },
    weather: weatherInfo,
    dt
  } = weather;

  const { description, icon } = weatherInfo[0];

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">
          📍 {name}, {country}
        </h2>
        <p className="date-time">
          {formatDate(dt)} • {formatTime(dt)}
        </p>
      </div>

      <div className="weather-main">
        <img 
          src={getIconUrl(icon, '4x')} 
          alt={description}
          className="weather-icon"
        />
        <div className="temperature-wrapper">
          <span className="temperature">{Math.round(temp)}</span>
          <span className="degree">°C</span>
        </div>
      </div>

      <div className="weather-info">
        <p className="description">{description}</p>
        <p className="feels-like">Feels like {Math.round(feels_like)}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;