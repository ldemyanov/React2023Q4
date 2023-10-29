import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SearchPage from './SearchPage.tsx';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  </React.StrictMode>
);
