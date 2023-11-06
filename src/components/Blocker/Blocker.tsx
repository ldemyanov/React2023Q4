import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classes from './style.module.scss';

const Blocker: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { characterId } = useParams();

  return (
    <div className={characterId ? classes.blocker : classes.noblocker}>
      <Link className={classes.blockerLink} to={`/?${searchParams.toString()}`} />
    </div>
  );
};

export default Blocker;
