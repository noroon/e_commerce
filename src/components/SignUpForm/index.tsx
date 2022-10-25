import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../Button';
import Form from '../Form';

import { signUpRequest } from '../../reducers/user/actions';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import './index.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const formFields = [
  {
    name: 'displayName',
    type: 'text',
    label: 'Display Name',
    id: 'signUpForm01',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    id: 'signUpForm02',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    id: 'signUpForm03',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    id: 'signUpForm04',
  },
];

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      dispatch(signUpRequest(email, password, displayName));
      setFormData(defaultFormFields);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Email is already exists');
      }
      if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
        alert(
          (error as AuthError).message.match(/(?![Firebase: ]).*(?= \()/gi),
        );
      }
      if ((error as AuthError).code === AuthErrorCodes.INVALID_EMAIL) {
        alert('Use a valid email');
      }
      console.log('user creation encountered an error', error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email</span>
      <Form
        handleSubmit={handleSubmit}
        formFields={formFields}
        formData={formData}
        setFormData={setFormData}
      >
        <Button type="submit">Sign up</Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
