module.exports.checkEmail = (users, email) => {
  return users.find((item) => item.email === email);
};

module.exports.checkUsername = (users, username) => {
  return users.find((item) => item.username === username);
};
