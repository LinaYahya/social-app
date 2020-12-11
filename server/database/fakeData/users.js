const Users = require('../modals/Users');

module.exports = async () => {
  const users = [
    {
      email: 'omar@gmail.com',
      name: 'Omar',
      password: '$2b$10$IDbFr20pt/ZaCZdoSxzD.OT4o4gxmmkPpK.qfqqlbvR/5T9G4bWAC',
      active: true,
    },
    {
      email: 'lina@gmail.com',
      name: 'lina',
      password: '$2b$10$IDbFr20pt/ZaCZdoSxzD.OT4o4gxmmkPpK.qfqqlbvR/5T9G4bWAC',
      active: true,
    },
  ];

  await Users.deleteMany({});
  await Users.create(users);
};
