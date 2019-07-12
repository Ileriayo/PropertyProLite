const userModel = {
  addUser: user => userModel.list.push(user),
  getAllUsers: () => userModel.list,
  getUserById: userId => userModel.list.find(user => user.id === userId),
  getUserByEmail: userEmail => userModel.list.find(user => user.email === userEmail),
  list: [],
};

export default userModel;
