import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages';
import { DetailCard } from './components';
import Page404 from './pages/Page404/Page404';

const Router = () => {
  return (
    <Routes>
      <Route path="/React2023Q4" element={<SearchPage />} />
      <Route path="/" element={<SearchPage />}>
        <Route path="/:characterId" element={<DetailCard />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
