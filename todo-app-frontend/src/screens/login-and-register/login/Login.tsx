import React from 'react';
import classes from './LoginAndRegister.module.css';
import { Link } from 'react-router';

function handleSubmbit() {
  alert('working');
}

function Login() {
  return (
    <div className={classes.container}>
    <form className={classes.form} onSubmit={handleSubmbit}>
      <label className={classes.input}>
        Email:
        <input name='email' />
      </label>
      <label className={classes.input}>
        Password:
        <input name='password' type='password' />
      </label>
      <button>Log in</button>
      <Link to={'/register'}>I don't have an account</Link>
    </form>
    </div>
  );
}

export default Login;
