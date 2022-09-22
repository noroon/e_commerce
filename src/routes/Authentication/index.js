import SignUpForm from '../../components/SignUpForm';
import SignInForm from './../../components/SignInForm';
import './index.scss';

export default function Authentication() {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
