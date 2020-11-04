const Users = require('../modals/Users');

module.exports = async () => {
  const users = [
    {
      email: 'omar@gmail.com',
      name: 'Omar',
      password: '$2y$12$LEE968m7hvH.7lG8fR5BC.2p2Ak3YirUebRA.fGE06ZnAxgtn2USK',
    },
    {
      email: 'lina@gmail.com',
      name: 'lina',
      password: '$2y$12$LEE968m7hvH.7lG8fR5BC.2p2Ak3YirUebRA.fGE06ZnAxgtn2USK',
    },
  ];

  await Users.deleteMany({});
  await Users.create(users);
};
