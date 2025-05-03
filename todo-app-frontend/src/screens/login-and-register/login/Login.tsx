import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import classes from './LoginAndRegister.module.css';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { LoginUserData } from '../../../types/user';
import { useForm } from 'react-hook-form';
import InputError from '../../../components/error messages/InputError';
import { useLoginUser } from '../../../services/mutations';


export const loginUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
});


function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const navigate = useNavigate();
  const loginUserMutation = useLoginUser();

  function handleLoginUser(data: LoginUserData) {
    loginUserMutation.mutate(data)
  }

  useEffect(() => {
    if (
      loginUserMutation.error?.response.message ===
      'Password is incorrect'
    ) {
      setError('password', {
        type: 'manual',
        message: loginUserMutation.error?.response.message
      });
    }
    if (loginUserMutation.isSuccess) {
      navigate('/Todos');
    }
  }, [loginUserMutation.error, loginUserMutation.isSuccess]);
  

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(handleLoginUser)}>
        <label className={classes.input}>
          Email:
          <input {...register('email')} name='email' />
          {errors.email && (
            <InputError errorText={errors.email.message || ''} />
          )}
        </label>
        <label className={classes.input}>
          Password:
          <input {...register('password')} name='password' type='password' />
          {errors.password && (
            <InputError errorText={errors.password.message || ''} />
          )}
        </label>
        <button>Log in</button>
        <Link to={'/register'}>I don't have an account</Link>
      </form>
    </div>
  );
}

export default Login;
