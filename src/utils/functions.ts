import { ChangeEvent } from 'react';

export const handleChange = (
  { target }: ChangeEvent<HTMLInputElement>,
  formData: Record<string, string>,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
) => {
  const { name, value, type, checked } = target;
  const isCheckbox = type === 'checkbox';

  setFormData({
    ...formData,
    [name]: isCheckbox ? checked : value,
  });  
};
