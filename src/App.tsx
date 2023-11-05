import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages';
import { DetailCard } from './components';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />}>
          <Route path="/:chId" element={<DetailCard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
