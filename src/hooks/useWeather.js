import { useState, useCallback } from 'react';
import { getWeatherByCity, getForecast, getWeatherByCoords } from '../services/weatherApi';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search weather by city name
  const searchCity = useCallback(async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch both current weather and forecast simultaneously
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCity(city),
        getForecast(city)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get weather using geolocation
  const getLocationWeather = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByCoords(latitude, longitude);
          const forecastData = await getForecast(weatherData.name);

          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to get your location. Please search manually.');
        setLoading(false);
      }
    );
  }, []);

  // Clear error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    searchCity,
    getLocationWeather,
    clearError
  };
};

export default useWeather;