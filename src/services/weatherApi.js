// src/services/weatherApi.js

// Your API key (will work once activated)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// 🔄 Set to false once your API key is activated
const USE_DEMO_MODE = true;

// Demo data for testing
const DEMO_WEATHER = {
  "New York": {
    name: "New York",
    sys: { country: "US", sunrise: 1705057200, sunset: 1705091400 },
    main: { temp: 8, feels_like: 5, humidity: 65, pressure: 1015, temp_min: 5, temp_max: 11 },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 5.2, deg: 280 },
    visibility: 10000,
    clouds: { all: 10 },
    dt: Date.now() / 1000
  },
  "London": {
    name: "London",
    sys: { country: "GB", sunrise: 1705050000, sunset: 1705080000 },
    main: { temp: 12, feels_like: 10, humidity: 80, pressure: 1020, temp_min: 9, temp_max: 14 },
    weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
    wind: { speed: 4.1, deg: 200 },
    visibility: 8000,
    clouds: { all: 75 },
    dt: Date.now() / 1000
  },
  "Tokyo": {
    name: "Tokyo",
    sys: { country: "JP", sunrise: 1705017600, sunset: 1705054800 },
    main: { temp: 15, feels_like: 14, humidity: 55, pressure: 1018, temp_min: 12, temp_max: 18 },
    weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
    wind: { speed: 3.5, deg: 90 },
    visibility: 10000,
    clouds: { all: 20 },
    dt: Date.now() / 1000
  },
  "Paris": {
    name: "Paris",
    sys: { country: "FR", sunrise: 1705051200, sunset: 1705083600 },
    main: { temp: 10, feels_like: 8, humidity: 70, pressure: 1012, temp_min: 7, temp_max: 12 },
    weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
    wind: { speed: 6.2, deg: 180 },
    visibility: 6000,
    clouds: { all: 90 },
    dt: Date.now() / 1000
  },
  "Dubai": {
    name: "Dubai",
    sys: { country: "AE", sunrise: 1705033200, sunset: 1705072800 },
    main: { temp: 28, feels_like: 30, humidity: 45, pressure: 1010, temp_min: 25, temp_max: 31 },
    weather: [{ id: 800, main: "Clear", description: "sunny", icon: "01d" }],
    wind: { speed: 2.5, deg: 45 },
    visibility: 10000,
    clouds: { all: 0 },
    dt: Date.now() / 1000
  },
  "default": {
    name: "Unknown City",
    sys: { country: "XX", sunrise: 1705050000, sunset: 1705090000 },
    main: { temp: 20, feels_like: 19, humidity: 60, pressure: 1013, temp_min: 18, temp_max: 22 },
    weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
    wind: { speed: 4.0, deg: 120 },
    visibility: 10000,
    clouds: { all: 40 },
    dt: Date.now() / 1000
  }
};

// Generate demo forecast
const generateDemoForecast = (cityName) => {
  const baseWeather = DEMO_WEATHER[cityName] || DEMO_WEATHER["default"];
  const list = [];
  const weatherConditions = [
    { main: "Clear", description: "clear sky", icon: "01d" },
    { main: "Clouds", description: "few clouds", icon: "02d" },
    { main: "Clouds", description: "scattered clouds", icon: "03d" },
    { main: "Clouds", description: "broken clouds", icon: "04d" },
    { main: "Rain", description: "light rain", icon: "10d" }
  ];

  for (let i = 0; i < 40; i++) {
    const date = new Date();
    date.setHours(date.getHours() + i * 3);
    
    list.push({
      dt: Math.floor(date.getTime() / 1000),
      main: {
        temp: baseWeather.main.temp + Math.random() * 6 - 3,
        feels_like: baseWeather.main.feels_like + Math.random() * 6 - 3,
        humidity: Math.floor(baseWeather.main.humidity + Math.random() * 20 - 10),
        pressure: baseWeather.main.pressure
      },
      weather: [weatherConditions[Math.floor(Math.random() * weatherConditions.length)]],
      wind: {
        speed: baseWeather.wind.speed + Math.random() * 2 - 1,
        deg: Math.floor(Math.random() * 360)
      },
      visibility: 10000,
      clouds: { all: Math.floor(Math.random() * 100) }
    });
  }

  return {
    city: { name: baseWeather.name, country: baseWeather.sys.country },
    list
  };
};

// Fetch current weather by city name
export const getWeatherByCity = async (city) => {
  // Use demo mode if enabled
  if (USE_DEMO_MODE) {
    console.log("🔄 Using DEMO MODE - API key not yet activated");
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const cityKey = Object.keys(DEMO_WEATHER).find(
      key => key.toLowerCase() === city.toLowerCase()
    );
    
    if (cityKey) {
      return { ...DEMO_WEATHER[cityKey], name: cityKey };
    }
    
    // Return modified default data with the searched city name
    return { 
      ...DEMO_WEATHER["default"], 
      name: city,
      sys: { ...DEMO_WEATHER["default"].sys, country: "XX" }
    };
  }

  // Real API call
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.");
      }
      if (response.status === 401) {
        throw new Error("API key not activated yet. Please wait a few hours or enable demo mode.");
      }
      throw new Error("Failed to fetch weather data.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch 5-day forecast
export const getForecast = async (city) => {
  // Use demo mode if enabled
  if (USE_DEMO_MODE) {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return generateDemoForecast(city);
  }

  // Real API call
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("API key not activated yet.");
      }
      throw new Error("Failed to fetch forecast data.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch weather by coordinates (for geolocation)
export const getWeatherByCoords = async (lat, lon) => {
  // Use demo mode if enabled
  if (USE_DEMO_MODE) {
    console.log(`🔄 Demo mode - Location: ${lat}, ${lon}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a location-based response
    return {
      ...DEMO_WEATHER["default"],
      name: "Your Location",
      coord: { lat, lon }
    };
  }

  // Real API call
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("API key not activated yet.");
      }
      throw new Error("Failed to fetch weather for your location.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Get weather icon URL
export const getIconUrl = (iconCode, size = "2x") => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};