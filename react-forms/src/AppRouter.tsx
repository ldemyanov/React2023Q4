import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/RootPage';
import ControlledForm from './pages/ControlledForm';
import UncontrolledForm from './pages/UncontrolledForm';

export enum AppPath {
  Root = '/',
  UncontrolledForm = 'uncontrolled',
  ControlledForm = 'controlled',
}

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={AppPath.Root} element={<RootPage />}>
          <Route path={AppPath.ControlledForm} element={<ControlledForm />} />
          <Route path={AppPath.UncontrolledForm} element={<UncontrolledForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
