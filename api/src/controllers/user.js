const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require("mongoose");

const UserObject = require('../models/user');

const config = require('../config');

const JWT_MAX_AGE = "210m"; // 3h30

const { error } = require("../utils/response");
const msg = require("../utils/messages");

const { validateSignup, validateLogin, validateUserUpdate } = require('../utils/user');

// ===================================== GET =====================================

// Récupérer les informations de son propre compte
router.get('/me', passport.authenticate('user', { session: false }), async (req, res) => {
  try {
    const user = await UserObject.findById(req.user._id);

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: user });
    
  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});

router.get('/all', passport.authenticate('admin', { session: false }), async (req, res) => {
  try {
    const users = await UserObject.find();

    if (!users || users.length === 0)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: users });

  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});

router.get('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return error(res, 400, msg.server.INVALID_ID);

    const user = await UserObject.findById(req.params.id);

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: user });

  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});

// ===================================== POST =====================================

// SIGNUP
const { isStrongPassword } = require("../utils/password");
router.post("/signup", async (req, res) => {
  const ValidateError = validateSignup(req.body);
  if (ValidateError) return error(res, 400, { ok: false, message: ValidateError });

  try {
    let { email, first_name, last_name, password, role } = req.body;

    if (!isStrongPassword(password))
      return error(res, 400, {
        code: "WEAK_PASSWORD",
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
      });

    if (await UserObject.findOne({ email }))
      return error(res, 401, msg.user.ALREADY_EXISTS);

    const user = await UserObject.create({ 
      email: email, 
      first_name: first_name, 
      last_name: last_name, 
      password: password, 
      role: role === "admin" ? "admin" : "user",
    });

    user.set({ last_login_at: Date.now() });
    await user.save();

    const token = jwt.sign({ _id: user.id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, data: user });

  } catch (e) {
    console.log(e);
    return error(res, 500, msg.server.ERROR);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const ValidateError = validateLogin(req.body);
    if (ValidateError) return error(res, 400, { ok: false, message: ValidateError });
    
    const { password, email } = req.body;

    const user = await UserObject.findOne({ email });

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    const match = await user.comparePassword(password);
    if (!match)
      return error(res, 401, msg.auth.INVALID_CREDENTIALS);

    user.set({ last_login_at: Date.now() });
    await user.save();

    const token = jwt.sign({ _id: user.id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, data: user });

  } catch (e) {
    console.log(e);
    return error(res, 500, msg.server.ERROR);
  }
});

// ===================================== UPDATE =====================================

// Mise à jour de son propre compte
router.put('/me', passport.authenticate('user', { session: false }), async (req, res) => {
  try {
    const ValidateError = validateUserUpdate(req.body);
    if (ValidateError) return error(res, 400, { ok: false, message: ValidateError });
    const updates = req.body;
    const user = await UserObject.findByIdAndUpdate(req.user._id, updates, { new: true });

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: user });

  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});

router.put('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return error(res, 400, msg.server.INVALID_ID);

    const ValidateError = validateUserUpdate(req.body);
    if (ValidateError) return error(res, 400, { ok: false, message: ValidateError });
    
    const updates = req.body;
    const user = await UserObject.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: user });

  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});

// ===================================== DELETE =====================================

// Suppression de son propre compte
router.delete('/me', passport.authenticate('user', { session: false }), async (req, res) => {
  try {
    const user = await UserObject.findByIdAndDelete(req.user._id);

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: user });

  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});

router.delete('/:id', passport.authenticate('admin', { session: false }), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return error(res, 400, msg.server.INVALID_ID);

    const user = await UserObject.findByIdAndDelete(req.params.id);

    if (!user)
      return error(res, 404, msg.user.NOT_FOUND);

    return res.status(200).send({ ok: true, data: user });

  } catch (e) {
    console.log(e);
    error(res, 500, msg.server.ERROR);
  }
});


module.exports = router;