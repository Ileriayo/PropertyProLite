const userModel = {
  // addUser: user => userModel.list.push(user),
  // getAllUsers: () => userModel.list,
  getUserById: userId => userModel.list.find(user => user.id === userId),
  getUserByEmail: userEmail => userModel.list.find(user => user.email === userEmail),
  list: [{
    id: 1,
    email: 'admin@gmail.com',
    first_name: 'Admin',
    last_name: 'Admin-last',
    password: '$2y$10$iEfAsPIuw9fYi.BmHpS9e.PxU05gtdZhpZGDRcGgC7RiVjQOgoXW6',
    phone_number: '08123456789',
    address: '1, Fosoke Street, Isale Eko, Eko',
    is_admin: true,
  }],
};

export default userModel;
