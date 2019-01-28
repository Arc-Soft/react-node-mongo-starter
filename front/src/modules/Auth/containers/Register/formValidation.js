export default ({ email, password,repassword }) => {
  const errors = {};
  if (!email) {
    errors['email'] = 'No email';
  }
  if (!password) {
    errors['password'] = 'No password';
  }
  if (!repassword || repassword !== password) {
    errors['repassword'] = 'Passwords must be the same';
  }
  return errors;
};
