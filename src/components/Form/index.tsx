import { ChangeEvent, FormEvent, FC, InputHTMLAttributes } from 'react';

import FormInput from '../FormInput';
import { handleChange } from '../../utils/functions';

type FormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  formFields: {
    name: string;
    type: string;
    label: string;
    id: string;
  }[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
} & InputHTMLAttributes<HTMLInputElement>;

const Form: FC<FormProps> = ({
  handleSubmit,
  formFields,
  formData,
  setFormData,
  children,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map(
        ({
          name,
          type,
          label,
          id,
        }: {
          name: string;
          type: string;
          label: string;
          id: string;
        }) => (
          <FormInput
            key={id}
            label={label}
            inputOptions={{
              required: true,
              name,
              type,
              value: formData[name],
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, formData, setFormData),
            }}
          />
        ),
      )}
      {children}
    </form>
  );
};

export default Form;
