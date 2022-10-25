import { FC, InputHTMLAttributes } from 'react';
import './index.scss';

type FormInputProps = {
  label: string;
  inputOptions: any;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, inputOptions }) => {
  return (
    <div className="group">
      <input className="form-input" autoComplete="off" {...inputOptions} />
      {label && (
        <label
          className={`${
            inputOptions.value &&
            typeof inputOptions.value === 'string' &&
            inputOptions.value.length
              ? 'shrink'
              : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
