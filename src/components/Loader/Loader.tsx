import React from 'react';
import classes from './style.module.scss';

type LoaderProps = {
  testId?: string;
};

const Loader: React.FC<LoaderProps> = ({ testId = 'Loader' }) => (
  <div data-testid={testId} className={classes.loader}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
