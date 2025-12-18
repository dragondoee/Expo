const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require("mongoose");

const UserObject = require('../models/note');

const config = require('../config');

const JWT_MAX_AGE = "210m"; // 3h30

const error = require("../utils/response");
const msg = require("../utils/messages");

// ===================================== GET ======================================

/* récupérer les notes de l'utilisateur connecté */
router.get('/user/all', passport.authenticate('user', { session: false }), async (req, res) => {
    console.log("[API] Récupération des notes de l'utilisateur :", req.user._id);
    try {
        const notes = await UserObject.find({ user_id: req.user._id });
        if (!notes || notes.length === 0)
            return error(res, 404, msg.note.NOT_FOUND);

        console.log(notes);
        return res.status(200).send({ ok: true, data: notes });
    }
    catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }
});

/* récupérer une note de l'utilisateur connecté */
router.get('/user/:id', passport.authenticate('user', { session: false }), async (req, res) => {
    console.log("[API] Récupération d'une note de l'utilisateur :", req.user._id);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return error(res, 400, msg.server.INVALID_ID);
        
        const note = await UserObject.find({ user_id: req.user._id, _id: req.params.id });
        if (!note || note.length === 0)
            return error(res, 404, msg.note.NOT_FOUND);

        return res.status(200).send({ ok: true, data: note });
    }
    catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }
});

router.get('/all', passport.authenticate('admin', { session: false }), async (req, res) => {
    console.log("[API] Récupération de toutes les notes");
    try {
        const notes = await UserObject.find({});
        return res.send({ ok: true, notes });
    }
    catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }
});

router.get('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return error(res, 400, msg.server.INVALID_ID);

        const note = await UserObject.findById(req.params.id);
        
        if (!note || note.length === 0)
            return error(res, 404, msg.note.NOT_FOUND);

        return res.status(200).send({ ok: true, data: note, message: msg.note.FOUND.message });

    } catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }
});

// ===================================== POST =====================================

router.post('/create', passport.authenticate('user', { session: false }), async (req, res) => {
    console.log("[API] Tentative de création de note :", req.body); 
    try {
        const { title, content, user_id } = req.body;
        
        const newNote = new UserObject({
            user_id: user_id,
            title, 
            content: content, 
        });
        
        await newNote.save();
        console.log("[API] Note sauvegardée avec succès !");

        return res.status(200).send({ ok: true, data: newNote, message: msg.note.CREATED.message });

    } catch (e) {
        console.error("[API] Erreur création :", e);
        return error(res, 500, msg.server.ERROR);
    }
});

// ===================================== UPDATE =====================================

// Mise à jour d'une note de l'utilisateur connecté
router.put('/user/:id', passport.authenticate('user', { session: false }), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return error(res, 400, msg.server.INVALID_ID);

        const { title, content } = req.body;
        const updatedNote = await UserObject.findByIdAndUpdate(
            { _id: req.params.id,  user_id: req.user._id },
            { title, content: content },
            { new: true }
        );
        if (!updatedNote)
            return error(res, 404, msg.note.NOT_FOUND);

        return res.status(200).send({ ok: true, data: updatedNote, message: msg.note.UPDATED.message });

    } catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }   
});

router.put('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return error(res, 400, msg.server.INVALID_ID);

        const { title, content } = req.body;
        const updatedNote = await UserObject.findByIdAndUpdate(
            req.params.id,
            { title, content: content },
            { new: true }
        );
        if (!updatedNote)
            return error(res, 404, msg.note.NOT_FOUND);
        return res.status(200).send({ ok: true, data: updatedNote, message: msg.note.UPDATED.message });
    } catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }   
});

// ===================================== DELETE =====================================

// Suppression d'une note de l'utilisateur connecté
router.delete('/user/:id', passport.authenticate('user', { session: false }), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return error(res, 400, msg.server.INVALID_ID);

        const deletedNote = await UserObject.findByIdAndDelete({ _id: req.params.id,  user_id: req.user._id });
        if (!deletedNote)
            return error(res, 404, msg.note.NOT_FOUND);
        return res.status(200).send({ ok: true, data: deletedNote, message: msg.note.DELETED.message });
    } catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }
});

router.delete('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return error(res, 400, msg.server.INVALID_ID);

        const deletedNote = await UserObject.findByIdAndDelete(req.params.id);
        if (!deletedNote)
            return error(res, 404, msg.note.NOT_FOUND);

        return res.status(200).send({ ok: true, data: deletedNote, message: msg.note.DELETED.message });

    } catch (e) {
        console.error(e);
        return error(res, 500, msg.server.ERROR);
    }
});

module.exports = router;

