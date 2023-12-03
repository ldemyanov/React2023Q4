import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import classes from './style.module.css';
import { AppPath } from '../../AppRouter';
import { useAppSelector } from '../../store/reduxStore';

const RootPage: React.FC = () => {
  const location = useLocation();
  const formData = useAppSelector((state) => state.uncontrolledForm)

  console.log(location);

  return (
    <div className={classes.wrapper}>
      <Header />

      {location.pathname === AppPath.Root ? <div>
        <div>
          <span>Email: </span>
          <span>{ formData.email }</span>
        </div>
        <div>
          <span>Password: </span>
          <span>{ formData.password }</span>
        </div>
        <div>
          <span>Name: </span>
          <span>{ formData.name }</span>
        </div>
        <div>
          <img src={formData.img} alt="Your photo" />
        </div>
        <div>
          <span>Age: </span>
          <span>{ formData.age }</span>
        </div>
        <div>
          <span>Gender: </span>
          <span>{ formData.gender }</span>
        </div>
        <div>
          <span>Country: </span>
          <span>{ formData.country }</span>
        </div>
      </div> : <Outlet />}
    </div>
  );
};

export default RootPage;
