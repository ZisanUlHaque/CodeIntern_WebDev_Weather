const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const {
    main: { humidity, pressure, temp_min, temp_max },
    wind: { speed, deg },
    visibility,
    clouds: { all: cloudiness },
    sys: { sunrise, sunset }
  } = weather;

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get wind direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  const details = [
    { icon: '💧', label: 'Humidity', value: `${humidity}%` },
    { icon: '💨', label: 'Wind', value: `${speed} m/s ${getWindDirection(deg)}` },
    { icon: '🌡️', label: 'Pressure', value: `${pressure} hPa` },
    { icon: '👁️', label: 'Visibility', value: `${(visibility / 1000).toFixed(1)} km` },
    { icon: '☁️', label: 'Cloudiness', value: `${cloudiness}%` },
    { icon: '🌡️', label: 'Min / Max', value: `${Math.round(temp_min)}° / ${Math.round(temp_max)}°` },
    { icon: '🌅', label: 'Sunrise', value: formatTime(sunrise) },
    { icon: '🌇', label: 'Sunset', value: formatTime(sunset) }
  ];

  return (
    <div className="weather-details">
      <h3 className="section-title">Weather Details</h3>
      <div className="details-grid">
        {details.map((item, index) => (
          <div key={index} className="detail-item">
            <span className="detail-icon">{item.icon}</span>
            <div className="detail-content">
              <span className="detail-label">{item.label}</span>
              <span className="detail-value">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;