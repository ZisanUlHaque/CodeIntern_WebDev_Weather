import { getIconUrl } from '../services/weatherApi';

const Forecast = ({ forecast }) => {
  if (!forecast) return null;

  // Get one forecast per day (around noon)
  const getDailyForecasts = () => {
    const daily = [];
    const seenDates = new Set();

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      const hour = date.getHours();

      // Get forecast around noon, one per day
      if (!seenDates.has(dateString) && hour >= 11 && hour <= 14) {
        seenDates.add(dateString);
        daily.push(item);
      }
    });

    // Fallback: if not enough, take every 8th item
    if (daily.length < 5) {
      return forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);
    }

    return daily.slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts();

  // Format day name
  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="forecast">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-day">{formatDay(day.dt)}</p>
            <p className="forecast-date">{formatDate(day.dt)}</p>
            <img 
              src={getIconUrl(day.weather[0].icon)} 
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
            <p className="forecast-desc">{day.weather[0].main}</p>
            <div className="forecast-extra">
              <span>💧 {day.main.humidity}%</span>
              <span>💨 {Math.round(day.wind.speed)}m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;