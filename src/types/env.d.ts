declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_OPENWEATHER_API_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
} 