import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// StrictMode는 개발 환경에서만 사용하여 무한 새로고침 방지
const AppComponent = process.env.NODE_ENV === 'development' ? 
  <App /> : // StrictMode 제거로 이중 렌더링 방지
  <React.StrictMode><App /></React.StrictMode>;

root.render(AppComponent);
// serviceWorkerRegistration.register();
