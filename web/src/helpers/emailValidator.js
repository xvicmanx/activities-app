const emailValidator = (email) => {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return email.match(mailformat) ? true : false;
};

export default emailValidator;
