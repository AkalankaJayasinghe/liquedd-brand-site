// Custom hook for managing form state and validation
import { useState, useCallback } from 'react';

export const useForm = (initialState = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const validate = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  }, [validationRules, values]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validate, touched]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validate]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validate(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validate, validationRules, values]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialState]);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    const isValid = validateAll();
    
    if (isValid) {
      try {
        await onSubmit(values);
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateAll, resetForm]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

// Form validation rules
export const validationRules = {
  required: (value) => !value?.toString().trim() ? 'This field is required' : '',
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? 'Invalid email format' : '';
  },
  minLength: (min) => (value) => 
    value && value.toString().length < min ? `Must be at least ${min} characters` : '',
  maxLength: (max) => (value) => 
    value && value.toString().length > max ? `Must be no more than ${max} characters` : '',
  phone: (value) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return value && !phoneRegex.test(value.replace(/[\s\-()]/g, '')) ? 'Invalid phone number' : '';
  }
};