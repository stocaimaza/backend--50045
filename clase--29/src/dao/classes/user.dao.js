const UserModel = require("../models/user.model.js");

class UserDAO {
    async getUsers(){
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id) {
        try {
            const buscado = await UserModel.findOne({_id:id});
            return buscado; 
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async saveUser(user) {
        try {
            let resultado = await UserModel.create(user);
            return resultado; 
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async updateUser(id, user) {
        try {
            let resultado = UserModel.updateOne({_id: id}, {$set:user});
            return resultado; 
        } catch (error) {
            console.log(error);
            return null; 
        }
    }
}

module.exports = UserDAO;