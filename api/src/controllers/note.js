const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');

const UserObject = require('../models/note');

const config = require('../config');

const JWT_MAX_AGE = "6m"; // 6 months

const SERVEUR_ERROR = 'SERVEUR_ERROR';


// ===================================== GET ======================================

router.get('/all', async(req,res) => {
    try {
        const notes = await UserObject.find();
        if(!notes)
            return res.status(404).send({ ok:false, code:'note not found'});
        return res.send({ ok:true, notes });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});
router.get('/:id', async(req,res) => {
    try {
        const note = await UserObject.findById(req.params.id);
        if(!note)
            return res.status(404).send({ ok:false, code:'note not found'});
        return res.send({ ok:true, note });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

// ===================================== POST =====================================

router.post('/create', async(req,res) => {
    try {
        const { title, content, folderId } = req.body;
        const newNote = new UserObject({ title, content, folderId });
        await newNote.save();
        return res.send({ ok:true, note: newNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

router.post('/update/:id', async(req,res) => {
    try {
        const { title, content, folderId } = req.body;
        const updatedNote = await UserObject.findByIdAndUpdate(req.params.id, { title, content, folderId }, { new: true });
        if(!updatedNote)
            return res.status(404).send({ ok:false, code:'note not found'});
        return res.send({ ok:true, note: updatedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

// ===================================== DELETE =====================================

router.delete('/delete/:id', async(req,res) => {
    try {
        const deletedNote = await UserObject.findByIdAndDelete(req.params.id);
        if(!deletedNote)
            return res.status(404).send({ ok:false, code:'note not found'});
        return res.send({ ok:true, note: deletedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok:false, code:SERVEUR_ERROR });
    }
});

module.exports = router;

