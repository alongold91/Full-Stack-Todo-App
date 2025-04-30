import React from 'react';
import classes from './InputError.module.css';

interface InputErrorProps {
  errorText: string;
}

function InputError({ errorText }: InputErrorProps) {
  return <p className={classes.error__text}>{errorText}</p>;
}

export default InputError;
