const UserDAO = require("../dao/classes/user.dao.js");
const userService = new UserDAO();

const getUsers = async (req, res) => {
    let result = await userService.getUsers();
    res.send(result);
}

const getUserById = async (req, res) => {
    const {uid} = req.params;
    let user = await userService.getUserById(uid);
    res.send(user);
}


const saveUser = async (req, res) => {
    const user = req.body; 
    let result = await userService.saveUser(user);
    res.send(result);
}

module.exports = {
    getUsers,
    getUserById,
    saveUser
}