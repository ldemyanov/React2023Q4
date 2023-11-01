import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage, SearchDetailPage } from './pages';
import { Layout } from './components';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="detail/" element={<SearchDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
