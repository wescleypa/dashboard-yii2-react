
export default function validateForm(formData) {
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  let isValid = true;
  let errors = { email: '', password: '' };

  if (!formData.email) {
    errors.email = 'E-mail é obrigatório';
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = 'E-mail inválido';
    isValid = false;
  }

  if (!formData.password) {
    errors.password = 'Senha é obrigatória';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
    isValid = false;
  }

  return {
    success: !!isValid,
    errors
  }
}