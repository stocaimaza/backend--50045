const BusinessDAO = require("../dao/classes/business.dao.js");
const businessService = new BusinessDAO();


const getBusiness =  async (req, res) => {
    let result = await businessService.getBusinnes();
    if(!result) {
        return res.status(500).send("Error");   
    }
    res.send(result);
}

const getBusinessById = async (req, res) => {
    const {bid} = req.params;
    let result = await businessService.getBusinessById(bid);
    if(!result) {
        return res.status(500).send("Error");   
    }
    res.send(result); 
}

const createBusiness = async (req, res) => {
    const business = req.body; 
    let result = await businessService.saveBusiness(business);
    if(!result) {
        return res.status(500).send("Error");   
    }
    res.send(result); 
}

const addProduct = async (req, res) => {
    let product = req.body; 
    let business = await businessService.getBusinessById(req.params.bid);
    business.products.push(product);
    await businessService.updateBusiness(business._id, business);
    res.send("Business Updated!");
}

module.exports = {
    getBusiness,
    getBusinessById,
    createBusiness,
    addProduct
}