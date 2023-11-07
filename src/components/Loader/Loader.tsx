import React from 'react';
import classes from './style.module.scss';

const Loader: React.FC = () => (
  <div className={classes.loader}>
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
