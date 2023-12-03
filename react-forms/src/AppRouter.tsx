import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/rootPage/RootPage';
import ControlledForm from './pages/controlledForm/ControlledForm';
import UncontrolledForm from './pages/uncontrolledForm/UncontrolledForm';

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
