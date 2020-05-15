module.exports.checkEmail = (users, email) => {
  return users.find((item) => item.email === email);
};

module.exports.generateRgb = () => {
  const rgb = [0, 0, 0];
  rgb[0] = Math.round(Math.random() * 255);
  rgb[1] = Math.round(Math.random() * 255);
  rgb[2] = Math.round(Math.random() * 255);

  return rgb;
};
