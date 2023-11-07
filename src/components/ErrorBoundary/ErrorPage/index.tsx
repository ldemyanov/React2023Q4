import React from 'react';
import classes from './style.module.scss';

type ErrorPageProps = {
  continueWork: () => void;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ continueWork }) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.message}>Something went wrong.</h1>
      <hr />
      <button className={classes.link} onClick={continueWork}>
        Go back to the main page
      </button>
    </div>
  );
};

export default ErrorPage;
