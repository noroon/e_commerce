import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../FormInput/index';
import Button from '../Button/index';

import { handleChange } from '../../utils/functions';
import {
  requestEmailSignIn,
  requestGoogleSignIn,
} from '../../reducers/user/actions';

import './index.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const formFields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    id: 'signInForm01',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    id: 'signInForm02',
  },
];

export default function SignInForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(defaultFormFields);
  const { email, password } = formData;

  const signInWithGoogle = async () => {
    dispatch(requestGoogleSignIn());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(requestEmailSignIn(email, password));
      setFormData(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password');
          break;
        case 'auth/user-not-found':
          alert('No user associated to this email');
          break;
        case 'auth/invalid-email':
          alert('Use a valid email');
          break;
        default:
          console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {formFields.map(({ name, type, label, id }) => (
          <FormInput
            key={id}
            label={label}
            inputOptions={{
              required: true,
              name,
              type,
              value: formData[name],
              onChange: (e) => handleChange(e, formData, setFormData),
            }}
          />
        ))}
        <div className="button-container">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
