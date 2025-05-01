import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import InputError from '../../../../components/error messages/InputError';
import { CreateUserData, createUserSchema } from '../../../../types/user';
import classes from '../LoginAndRegister.module.css';
import { useCreateNewUser } from '../../../../services/mutations';

function Register() {
  const {
    register,
    handleSubmit,
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
  const createNewUserMutation = useCreateNewUser();

  function handleCreateNewUser(data: CreateUserData) {
    createNewUserMutation.mutate(data);
  }

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
