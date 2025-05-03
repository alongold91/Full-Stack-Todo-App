import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import InputError from '../../../../components/error messages/InputError';
import { CreateUserData } from '../../../../types/user';
import classes from '../LoginAndRegister.module.css';
import { useCreateNewUser } from '../../../../services/mutations';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    firstName: z.string().min(1, 'First Name is a mandatory field'),
    lastName: z.string().min(1, 'Last Name is a mandatory field'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  });
  const navigate = useNavigate();
  const createNewUserMutation = useCreateNewUser();

  function handleCreateNewUser(data: CreateUserData) {
    createNewUserMutation.mutate(data);
  }

  useEffect(() => {
    if (
      createNewUserMutation.error?.response.message ===
      'Email is already in use'
    ) {
      setError('email', {
        type: 'manual',
        message: createNewUserMutation.error?.response.message
      });
    }
    if (createNewUserMutation.isSuccess) {
      navigate('/login');
    }
  }, [createNewUserMutation.error, createNewUserMutation.isSuccess]);

  return (
    <div className={classes.container}>
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleCreateNewUser)}
      >
        <label className={classes.input}>
          First Name:
          <input {...register('firstName')} name='firstName' />
          {errors.firstName && (
            <InputError errorText={errors.firstName.message || ''} />
          )}
        </label>
        <label className={classes.input}>
          Last Name:
          <input {...register('lastName')} name='lastName' />
          {errors.lastName && (
            <InputError errorText={errors.lastName.message || ''} />
          )}
        </label>
        <label className={classes.input}>
          Email:
          <input {...register('email')} name='email' />
          {errors.email && (
            <InputError errorText={errors.email.message || ''} />
          )}
        </label>
        <label className={classes.input}>
          Choose Password:
          <input {...register('password')} name='password' type='password' />
          {errors.password && (
            <InputError errorText={errors.password.message || ''} />
          )}
        </label>
        <label className={classes.input}>
          Confirm Password:
          <input
            {...register('confirmPassword')}
            name='confirmPassword'
            type='password'
          />
          {errors.confirmPassword && (
            <InputError errorText={errors.confirmPassword.message || ''} />
          )}
        </label>
        <button>Register</button>
        <Link to={'/login'}>I already have an account</Link>
      </form>
    </div>
  );
}

export default Register;
