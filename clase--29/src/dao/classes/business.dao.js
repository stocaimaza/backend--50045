const BusinessModel = require("../models/business.model.js");

class BusinessDAO {
    async getBusinnes() {
        try {
            const resultado = await BusinessModel.find(); 
            return resultado; 
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getBusinessById(id) {
        try {
            const resultado = await BusinessModel.findOne({_id:id});
            return resultado;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async saveBusiness(business) {
        try {
            const resultado = await BusinessModel.create(business);
            return resultado; 
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateBusiness() {
        try {
            const resultado = await BusinessModel.updateOne({_id:id}, {$set:business});
            return resultado; 
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = BusinessDAO;