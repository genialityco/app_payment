import { useState, useEffect } from 'react';

export const useFormData = (initialState = {}) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = sessionStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return [formData, handleChange, handleSelectChange];
};
