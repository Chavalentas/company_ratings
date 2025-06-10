const User = require("../models/user.model.js");
const { isNullOrUndefined, ensureNotNullOrUndefined } = require("../services/helper.service");
const jwt = require('jsonwebtoken');
const hashingService = require("../services/hashing.service.js");
const usersService = require("../services/users.service.js");

// POST /userid
const verifyUserAsync = async(req, res) => {
    try
    {
        var token = req.body.token;
        var decodedToken;

        ensureNotNullOrUndefined(token, `Variable 'req.body.token' was null or undefined!`);

        jwt.verify(token, 'secret', function(err, tokendata){
            if(err){
                return response.status(400).json({error: 'Unauthorized request'});
             }

              if(tokendata){
                decodedToken = tokendata;
              }
        })

        res.status(200).json({userId : decodedToken.userId});
    } catch (e){
        res.status(500).json({message : 'Token verification failed:  ' + e.message});
    }
};

// POST /register
const registerUserAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userName)){
            res.status(400).json({message: 'The property req.body.userName was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.password)){
            res.status(400).json({message: 'The property req.body.password was not defined or was null!'});
            return;
        }

        if (req.body.firstName === undefined){
            res.status(400).json({message: 'The property req.body.firstName was not defined!'});
            return;
        }

        if (req.body.lastName === undefined){
            res.status(400).json({message: 'The property req.body.lastName was not defined!'});
            return;
        }

        hashingService.hash(req.body.password).then((hashed) => {
            let user = new User(0, req.body.userName, hashed, req.body.firstName, req.body.lastName);
            usersService.insertUserAsync(user).then(() => {
                res.status(201).json({message : `The user was successfully registered!`});
            })
            .catch((error) => {
                res.status(500).json({message: 'The register operation failed: ' + error.message});
            })
        }).catch((error) => {
            res.status(500).json({message: 'The register operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The register operation failed:  ' + e.message});
    }
};

// POST /login
const loginUserAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userName)){
            res.status(400).json({message: 'The property req.body.userName was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.password)){
            res.status(400).json({message: 'The property req.body.password was not defined or was null!'});
            return;
        }

        let users = await usersService.getUserByUsernameAsync(String(req.body.userName));

        if (users.length !== 1){
            res.status(400).json({message: 'The users with the given username could not be found!'});
            return;          
        }

        hashingService.isValid(req.body.password, users[0].password).then((valid) => {
            if (valid){         
               var token = jwt.sign({userId: users[0].id},'secret', {expiresIn : '3h'});
               res.status(200).json({token: token});
            }
            else{
                res.status(404).json({message : 'Login failed:  ' + 'Wrong password'});
            }
        })
        .catch((error) => {
            res.status(404).json({message : 'The login operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The login operation failed:  ' + e.message});
    }
};

// PUT /:userId
const updateUserAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.params.userId)){
            res.status(400).json({message: 'The property req.params.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.body.userName)){
            res.status(400).json({message: 'The property req.body.userName was not defined or was null!'});
            return;
        }

        if (req.body.firstName === undefined){
            res.status(400).json({message: 'The property req.body.firstName was not defined!'});
            return;
        }

        if (req.body.lastName === undefined){
            res.status(400).json({message: 'The property req.body.lastName was not defined!'});
            return;
        }

        if (req.body.userId != req.params.userId){
            res.status(400).json({message: 'The user IDs must match!'});
            return;
        }

        let user = new User(req.params.userId, req.body.userName, "", req.body.firstName, req.body.lastName);
        usersService.updateUserAsync(req.params.userId, user).then(() => {
            res.status(200).json({message : `The user was successfully updated!`});    
        })
        .catch((error) => {
            res.status(404).json({message : 'The update profile operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The update profile operation failed:  ' + e.message});
    }
};

// PUT /pwd/:userId
const updatePasswordAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.body.userId)){
            res.status(400).json({message: 'The property req.body.userId was not defined or was null!'});
            return;
        }

        if (isNullOrUndefined(req.params.userId)){
            res.status(400).json({message: 'The property req.params.userId was not defined or was null!'});
            return;
        }  
        
        if (isNullOrUndefined(req.body.password)){
            res.status(400).json({message: 'The property req.body.password was not defined or was null!'});
            return;
        }

        if (req.body.userId != req.params.userId){
            res.status(400).json({message: 'The user IDs must match!'});
            return;
        }
        
        hashingService.hash(req.body.password).then((hashed) => {
            usersService.updatePasswordAsync(req.body.userId, hashed).then(() => {
                res.status(201).json({message : `The user password was successfully registered!`});
            }).catch((error) => {
                res.status(500).json({message: 'The update password operation failed: ' + error.message});
            })
        }).catch((error) => {
            res.status(500).json({message: 'The update password operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The update password operation failed:  ' + e.message});
    }
};

// DELETE /:userId
const deleteUserAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.userId)){
            res.status(400).json({message: 'The property req.params.userId was not defined or was null!'});
            return;
        } 
        
        usersService.deleteUserAsync(req.params.userId).then(() => {
            res.status(200).json({message : "The user was successfully deleted!"});
        }).catch((error) => {
            res.status(500).json({message: 'The delete profile operation failed: ' + error.message});
        })
    } catch (e){
        res.status(500).json({message : 'The delete profile operation failed:  ' + e.message});
    }
};

// GET /:userId
const getUserInformationAsync = async(req, res) => {
    try
    {
        if (isNullOrUndefined(req.params.userId)){
            res.status(400).json({message: 'The property req.params.userId was not defined or was null!'});
            return;
        } 

        let user = await usersService.getUserInformationAsync(req.params.userId);
        res.status(200).json(user);
    }
    catch(e){
        res.status(500).json({message: 'The get user information operation failed: ' + e.message});
    }
}

module.exports = {
    registerUserAsync,
    loginUserAsync,
    updateUserAsync,
    deleteUserAsync,
    verifyUserAsync,
    updatePasswordAsync,
    getUserInformationAsync
};