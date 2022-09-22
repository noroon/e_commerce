export const handleChange = ({ target }, formData, setFormData) => {
  const {name, value, type, checked} = target
  const isCheckbox = type === 'checkbox';

  setFormData({
    ...formData,
    [name]: isCheckbox ? checked : value,
  });
};