const Client = require("../models/client.model.js");
const clientsService = require("../services/clients.service.js");
const { isNullOrUndefined } = require("../services/helper.service");


// POST /register
const registerClientAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.name)){
            res.status(400).json({message: 'The property req.body.name was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.street)){
            res.status(400).json({message: 'The property req.body.street was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.city)){
            res.status(400).json({message: 'The property req.body.city was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.country)){
            res.status(400).json({message: 'The property req.body.country was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.postalCode)){
            res.status(400).json({message: 'The property req.body.postalCode was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        let client = new Client(0, req.body.name, req.body.street, req.body.city, req.body.country, req.body.postalCode, req.body.userId);
        clientsService.insertClientAsync(client).then(() => {
            res.status(201).json({message : `The client was successfully registered!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The register operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /byclient/search
const searchClientsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.searchExpression)){
            res.status(400).json({message: 'The property req.body.searchExpression was not defined or was null!'});
            return;
        }   

        let patternModified = req.body.searchExpression.toLowerCase().replace(' ', '');

        clientsService.searchClientsAsync(patternModified).then((clients) => {
            res.status(200).json({result : clients}); 
        }).catch((error) => {
            res.status(500).json({message: 'The search operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The search operation failed:  ' + e.message});
    } 
};

// PUT /:clientId
const updateClientAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.clientId)){
            res.status(400).json({message: 'The property req.body.clientId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.name)){
            res.status(400).json({message: 'The property req.body.name was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.street)){
            res.status(400).json({message: 'The property req.body.street was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.city)){
            res.status(400).json({message: 'The property req.body.city was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.postalCode)){
            res.status(400).json({message: 'The property req.body.postalCode was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.country)){
            res.status(400).json({message: 'The property req.body.country was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (req.body.clientId != req.params.clientId){
            res.status(400).json({message: 'The client IDs must match!'});
            return;
        }

        let client = new Client(req.body.clientId, req.body.name, req.body.street, req.body.city, req.body.country, req.body.postalCode, req.body.userId);
        clientsService.updateClientAsync(Number(req.params.clientId), client).then(() => {
            res.status(200).json({message : `The client was successfully updated!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The update operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The update operation failed:  ' + e.message});
    }
};

// DELETE /:clientId
const deleteClientAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        clientsService.deleteClientAsync(req.params.clientId).then(() => {
            res.status(200).json({message : `The client was successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// DELETE /deleteall/:userId
const deleteClientsForUserAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.userId)){
            res.status(400).json({message: 'The property req.params.userId was not defined or was null!'});
            return;
        }

        clientsService.deleteClientsForUserAsync(req.params.userId).then(() => {
            res.status(200).json({message : `The clients were successfully deleted!`}); 
        }).catch((error) => {
            res.status(500).json({message: 'The delete operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete operation failed:  ' + e.message});
    }
};

// GET /:clientId
const getClientAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.clientId)){
            res.status(400).json({message: 'The property req.params.clientId was not defined or was null!'});
            return;
        }

        let client = await clientsService.getClientInformationAsync(req.params.clientId);
        res.status(200).json(client);
    } catch (e){
        res.status(500).json({message : 'The get client operation failed:  ' + e.message});
    }
};

// GET /byuser/:userId
const getUserClientsAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.userId)){
            res.status(400).json({message: 'The property req.params.userId was not defined or was null!'});
            return;
        }

        let clients = await clientsService.getClientsByUserIdAsync(req.params.userId);
        res.status(200).json({result: clients});
    } catch (e){
        res.status(500).json({message : 'The get user clients operation failed:  ' + e.message});
    }
};

module.exports = {
    registerClientAsync,
    updateClientAsync,
    deleteClientAsync,
    getClientAsync,
    getUserClientsAsync,
    deleteClientsForUserAsync,
    searchClientsAsync
};