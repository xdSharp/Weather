// Типы для погодных данных от OpenWeatherMap API
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface SystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

// Типы для компонентов
export interface WeatherProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string;
}

export interface SearchFormProps {
  city: string;
  onCityChange: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export interface WeatherInfoProps {
  weather: WeatherData;
}

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
} 