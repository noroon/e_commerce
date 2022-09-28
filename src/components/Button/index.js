import Spinner from './../Spinner';
import './index.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

export default function Button({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) {
  return (
    <button
      disabled={isLoading}
      className={`button ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
