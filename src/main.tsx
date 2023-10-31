import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/';
import { SearchPage } from './pages/index.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <SearchPage />
  </ErrorBoundary>
);
