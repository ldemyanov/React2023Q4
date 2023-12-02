import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import classes from './style.module.css';

const RootPage: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
};

export default RootPage;
