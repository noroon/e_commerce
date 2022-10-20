import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from './../FormInput/index';
import Button from './../Button/index';

import { handleChange } from '../../utils/functions';
import { signUpRequest } from '../../reducers/user/actions';

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

export default function SignUpForm() {
  const [formData, setFormData] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      dispatch(signUpRequest(email, password, displayName));
      setFormData(defaultFormFields);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already exists');
      }
      if (error.code === 'auth/weak-password') {
        alert(error.message.match(/(?![Firebase: ]).*(?= \()/gi));
      }
      if (error.code === 'auth/invalid-email') {
        alert('Use a valid email');
      }
      console.log('user creation encountered an error', error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email</span>
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
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}
