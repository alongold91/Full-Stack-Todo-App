import React from 'react';
import classes from '../LoginAndRegister.module.css';
import { Link } from 'react-router';

function handleSubmbit() {
  alert('working');
}

function Register() {
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmbit}>
        <label className={classes.input}>
          First Name:
          <input name='firstName' />
        </label>
        <label className={classes.input}>
          Last Name:
          <input name='lastName' />
        </label>
        <label className={classes.input}>
          Email:
          <input name='email' />
        </label>
        <label className={classes.input}>
          Choose Password:
          <input name='choose-password' type='password' />
        </label>
        <label className={classes.input}>
          Confirm Password:
          <input name='confirm-password' type='password' />
        </label>
        <button>Register</button>
        <Link to={'/login'}>I already have an account</Link>
      </form>
    </div>
  );
}

export default Register;
