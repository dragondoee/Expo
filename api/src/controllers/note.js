const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');

const UserObject = require('../models/note');

const config = require('../config');

const JWT_MAX_AGE = "210m"; // 3h30

const SERVEUR_ERROR = 'SERVEUR_ERROR';


// ===================================== GET ======================================

/* récupérer les notes de l'utilisateur connecté */
router.get('/user/all', passport.authenticate('user', { session: false }), async (req, res) => {
    console.log("[API] Récupération des notes de l'utilisateur :", req.user._id);
    try {
        const notes = await UserObject.find({ user_id: req.user._id });
        if (!notes || notes.length === 0)
            return res.status(404).send({ ok: false, code: 'notes not found' });
        return res.status(200).send({ ok: true, notes });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }
});

/* récupérer une note de l'utilisateur connecté */
router.get('/user/:id', passport.authenticate('user', { session: false }), async (req, res) => {
    console.log("[API] Récupération d'une note de l'utilisateur :", req.user._id);
    try {
        const note = await UserObject.find({ user_id: req.user._id, _id: req.params.id });
        if (!note || note.length === 0)
            return res.status(404).send({ ok: false, code: 'note not found' });
        return res.status(200).send({ ok: true, note });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }
});

router.get('/all', passport.authenticate('admin', { session: false }), async (req, res) => {
    console.log("[API] Récupération de toutes les notes");
    try {
        const notes = await UserObject.find({});
        return res.send({ ok: true, notes });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }
});

router.get('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
    try {
        const note = await UserObject.findById(req.params.id);
        if (!note || note.length === 0)
            return res.status(404).send({ ok: false, code: 'note not found' });
        return res.status(200).send({ ok: true, note });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
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
        return res.status(200).send({ ok: true, note: newNote });
    } catch (error) {
        console.error("[API] Erreur création :", error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }
});

// ===================================== UPDATE =====================================

// Mise à jour d'une note de l'utilisateur connecté
router.put('/user/:id', passport.authenticate('user', { session: false }), async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await UserObject.findByIdAndUpdate(
            { _id: req.params.id,  user_id: req.user._id },
            { title, content: content },
            { new: true }
        );
        if (!updatedNote)
            return res.status(404).send({ ok: false, code: 'note not found' });
        return res.status(200).send({ ok: true, note: updatedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }   
});

router.put('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await UserObject.findByIdAndUpdate(
            req.params.id,
            { title, content: content },
            { new: true }
        );
        if (!updatedNote)
            return res.status(404).send({ ok: false, code: 'note not found' });
        return res.status(200).send({ ok: true, note: updatedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }   
});

// ===================================== DELETE =====================================

// Suppression d'une note de l'utilisateur connecté
router.delete('/user/:id', passport.authenticate('user', { session: false }), async (req, res) => {
    try {
        const deletedNote = await UserObject.findByIdAndDelete({ _id: req.params.id,  user_id: req.user._id });
        if (!deletedNote)
            return res.status(404).send({ ok: false, code: 'note not found' });
        return res.status(200).send({ ok: true, note: deletedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }
});

router.delete('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
    try {
        const deletedNote = await UserObject.findByIdAndDelete(req.params.id);
        if (!deletedNote)
            return res.status(404).send({ ok: false, code: 'note not found' });
        return res.status(200).send({ ok: true, note: deletedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, code: SERVEUR_ERROR });
    }
});

module.exports = router;

