import { ButtonHTMLAttributes, FC } from 'react';

import Spinner from '../Spinner';
import './index.scss';

enum BUTTON_TYPE_CLASSES {
  google = 'google-sign-in',
  inverted = 'inverted',
}

export type ButtonProps = {
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
  isLoading?: boolean | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  return (
    <button
      disabled={isLoading}
      className={`button ${buttonType && BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
