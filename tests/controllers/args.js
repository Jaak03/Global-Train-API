const userToRegister = {
  body: {
    password: '234982hruhwfkjwer123',
    gender: 'm',
    email: 'asds4t6w@asadf.com',
  }
};

const validLoginDetails = {
  body: {
    email: userToRegister.body.email,
    password: userToRegister.body.password,
  },
};

module.exports = {
  userToRegister,
  validLoginDetails,
};
