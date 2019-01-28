export default ({ password,repassword,currentpassword}) => {
  const errors = {};
  if (!currentpassword) {
    errors['currentpassword'] = 'Fill in'; 
  }
  if (!password) {
    errors['password'] = 'Fill in'; 
  }
  if (!repassword || repassword !== password) {
    errors['repassword'] = 'Both passwords must match';
  }
  return errors;
};
