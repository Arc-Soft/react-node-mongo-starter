export default ({ email, password }) => {
  const errors = {};
  if (!email) {
    errors['email'] = 'No email';
  }
  if (!password) {
    errors['password'] = 'No password';
  }
  return errors;
};
