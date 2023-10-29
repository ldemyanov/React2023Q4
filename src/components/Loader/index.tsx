import React from 'react';
import classes from './style.module.scss';

class Loader extends React.Component {
  render() {
    return (
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
  }
}

export default Loader;
