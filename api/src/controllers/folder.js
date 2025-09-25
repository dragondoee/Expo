const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');

const UserObject = require('../models/folder');

const config = require('../config');

const JWT_MAX_AGE = "6m"; // 6 months

const SERVEUR_ERROR = 'SERVEUR_ERROR';

// ===================================== GET ======================================

router.get('/all', async(req,res) => {
    try {
        const folders = await UserObject.find();
        if(!folders)
            return res.status(404).send({ ok:false, code:'folder not found'});
        return res.send({ ok:true, folders });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

router.get('/:id', async(req,res) => {
    try {
        const folder = await UserObject.findById(req.params.id);
        if(!folder)
            return res.status(404).send({ ok:false, code:'folder not found'});
        return res.send({ ok:true, folder });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

// ===================================== POST =====================================

router.post('/create', async(req,res) => {
    try {
        const { name } = req.body;
        const newFolder = new UserObject({ name });
        await newFolder.save();
        return res.send({ ok:true, folder: newFolder });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

router.post('/update/:id', async(req,res) => {
    try {
        const { name } = req.body;
        const updatedFolder = await UserObject.findByIdAndUpdate(req.params.id, {name}, { new: true });
        if(!updatedFolder)
            return res.status(404).send({ ok:false, code:'folder not found'});
        return res.send({ ok:true, folder: updatedFolder });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });  

    }
});

// ===================================== DELETE =====================================

router.delete('/delete/:id', async(req,res) => {
    try {
        const deletedFolder = await UserObject.findByIdAndDelete(req.params.id);
        if(!deletedFolder)
            return res.status(404).send({ ok:false, code:'folder not found'});
        return res.send({ ok:true, folder: deletedFolder });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});


module.exports = router;