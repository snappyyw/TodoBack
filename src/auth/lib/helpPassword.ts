export function validatePassword(password: string) {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  if (!hasNumber) {
    return "Пароль должен содержать хотя бы одну цифру.";
  }
  if (!hasUpperCase) {
    return "Пароль должен содержать хотя бы одну заглавную букву.";
  }

  if (!hasLowerCase) {
    return "Пароль должен содержать хотя бы одну строчную букву.";
  }

  return null;
}
