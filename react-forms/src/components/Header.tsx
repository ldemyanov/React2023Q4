import { NavLink } from "react-router-dom";
import { AppPath } from "../AppRouter";

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <NavLink
          to={AppPath.Root}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? 'pendingLink' : '',
              isActive ? 'activeLink' : '',
              isTransitioning ? 'transitioningLink' : '',
            ].join(' ')
          }
        >
          Root
        </NavLink>
        <NavLink
          to={AppPath.ControlledForm}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? 'pendingLink' : '',
              isActive ? 'activeLink' : '',
              isTransitioning ? 'transitioningLink' : '',
            ].join(' ')
          }
        >
          Controlled Form
        </NavLink>
        <NavLink
          to={AppPath.UncontrolledForm}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? 'pendingLink' : '',
              isActive ? 'activeLink' : '',
              isTransitioning ? 'transitioningLink' : '',
            ].join(' ')
          }
        >
          Uncontrolled Form
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
