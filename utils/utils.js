module.exports.checkEmail = (users, email) => {
  return users.find((item) => item.email === email);
};
