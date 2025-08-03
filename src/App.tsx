import React, { useState, useEffect } from 'react';
import './App.css';
import { WeatherData } from './types/weather';

// Компонент анимированного фона - просто для красоты
const AnimatedBackground: React.FC = () => {
  return (
    <div className="animated-background">
      {/* Градиентные круги - создают глубину */}
      <div className="gradient-circle circle-1"></div>
      <div className="gradient-circle circle-2"></div>
      <div className="gradient-circle circle-3"></div>
      <div className="gradient-circle circle-4"></div>
      
      {/* Облака - плавают по экрану */}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
      <div className="cloud cloud-4"></div>
      
      {/* Частицы - мелкие точки для атмосферы */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
      <div className="particle particle-5"></div>
      <div className="particle particle-6"></div>
      <div className="particle particle-7"></div>
      <div className="particle particle-8"></div>
      
      {/* Волны внизу экрана */}
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
      
      {/* Световые лучи сверху */}
      <div className="light-ray ray-1"></div>
      <div className="light-ray ray-2"></div>
      <div className="light-ray ray-3"></div>
      
      {/* Геометрические фигуры - крутятся */}
      <div className="geometric-shape shape-1"></div>
      <div className="geometric-shape shape-2"></div>
      <div className="geometric-shape shape-3"></div>
      <div className="geometric-shape shape-4"></div>
    </div>
  );
};

const App: React.FC = () => {
  // Состояния компонента
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // API ключ от OpenWeatherMap
  const API_KEY: string = process.env.REACT_APP_OPENWEATHER_API_KEY || '';

  // Переключаем тему (светлая/темная)
  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Применяем тему к body элементу
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Получаем погоду по названию города
  const getWeather = async (cityName: string): Promise<void> => {
    if (!cityName.trim()) return;
    
    if (!API_KEY) {
      setError('API ключ не настроен. Проверьте файл .env');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`
      );
      
      if (!response.ok) {
        throw new Error('Город не найден');
      }
      
      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    getWeather(city);
  };

  // Получаем URL иконки погоды от OpenWeatherMap
  const getWeatherIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Переводим описание погоды на русский
  const getWeatherDescription = (description: string): string => {
    const descriptions: Record<string, string> = {
      'clear sky': 'ясно',
      'few clouds': 'малооблачно',
      'scattered clouds': 'рассеянные облака',
      'broken clouds': 'облачно',
      'shower rain': 'ливень',
      'rain': 'дождь',
      'thunderstorm': 'гроза',
      'snow': 'снег',
      'mist': 'туман'
    };
    return descriptions[description] || description;
  };

  // Выбираем градиент в зависимости от температуры
  const getTemperatureGradient = (temp: number): string => {
    if (temp < 0) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    if (temp < 15) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    if (temp < 25) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
  };

  return (
    <div className={`App theme-${theme}`}>
      {/* Анимированный фон */}
      <AnimatedBackground />
      
      {/* Кнопка переключения темы */}
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="weather-container">
        <h1 className="app-title">
          Прогноз погоды
        </h1>
        
        {/* Форма поиска города */}
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введите название города..."
              className="city-input"
            />
            <div className="input-focus-border"></div>
          </div>
          <button type="submit" className="search-btn" disabled={loading}>
            <span className="btn-content">
              {loading ? (
                <>
                  <div className="spinner"></div>
                  <span>Поиск...</span>
                </>
              ) : (
                <>
                  <span className="search-icon">🔍</span>
                  <span>Найти</span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Показываем ошибку если есть */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {/* Спиннер загрузки */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Загрузка данных...</div>
          </div>
        )}

        {/* Отображаем данные о погоде */}
        {weather && !loading && (
          <div className="weather-info">
            <div className="city-name">
              <span className="location-icon">📍</span>
              {weather.name}, {weather.sys.country}
            </div>
            
            {/* Основная информация: иконка и температура */}
            <div 
              className="weather-main"
              style={{ background: getTemperatureGradient(weather.main.temp) }}
            >
              <div className="weather-icon-container">
                <img 
                  src={getWeatherIcon(weather.weather[0].icon)} 
                  alt="Погода" 
                  className="weather-icon"
                />
              </div>
              <div className="temperature-container">
                <div className="temperature">{Math.round(weather.main.temp)}°</div>
                <div className="temperature-unit">C</div>
              </div>
            </div>
            
            {/* Описание погоды */}
            <div className="weather-description">
              {getWeatherDescription(weather.weather[0].description)}
            </div>
            
            {/* Детальная информация */}
            <div className="weather-details">
              <div className="detail-item">
                <div className="detail-icon">🌡️</div>
                <div className="detail-content">
                  <span className="detail-label">Ощущается как</span>
                  <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">💧</div>
                <div className="detail-content">
                  <span className="detail-label">Влажность</span>
                  <span className="detail-value">{weather.main.humidity}%</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">💨</div>
                <div className="detail-content">
                  <span className="detail-label">Ветер</span>
                  <span className="detail-value">{Math.round(weather.wind.speed)} м/с</span>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-icon">📊</div>
                <div className="detail-content">
                  <span className="detail-label">Давление</span>
                  <span className="detail-value">{Math.round(weather.main.pressure * 0.750062)} мм рт.ст.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 