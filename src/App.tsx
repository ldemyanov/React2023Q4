import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages';
import { DetailCard } from './components';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/React2023Q4" element={<SearchPage />} />
        <Route path="/" element={<SearchPage />}>
          <Route path="/:chId" element={<DetailCard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
