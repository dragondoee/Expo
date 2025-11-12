const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');

const UserObject = require('../models/user');

const config = require('../config');

const JWT_MAX_AGE = "6m"; // 6 months

const SERVEUR_ERROR = 'SERVEUR_ERROR';

// ===================================== GET =====================================

router.get('/all', async(req,res) => {
    try {
        const users = await UserObject.find();

        if(!users)
            return res.status(404).send({ ok:false, code:'user not found'});

        return res.status(200).send({ ok:true, users});
    } catch (error){
        console.log(error);
        res.status(500).send({ ok:false, code:SERVEUR_ERROR, error});
    }
});

router.get('/email/:email', async(req,res) => {
    try {
        const user = await UserObject.findOne({email:req.params.email});

        if(!user)
            return res.status(404).send({ ok:false, code:'user not found'});

        return res.status(200).send({ ok:true, user});
    } catch (error){
        console.log(error);
        res.status(500).send({ ok:false, code:SERVEUR_ERROR, error});
    }
});

router.get('/:id', async(req,res) => {
    try {
        const user = await UserObject.findById(req.params.id);

        if(!user)
            return res.status(404).send({ ok:false, code:'user not found'});

        return res.status(200).send({ ok:true, user});
    } catch (error){
        console.log(error);
        res.status(500).send({ ok:false, code:SERVEUR_ERROR, error});
    }
});

// ===================================== POST =====================================

// SIGNUP
router.post("/signup", async (req, res) => {
    let { email, first_name, last_name, password, cpassword } = req.body;
    email = (email || "").trim().toLowerCase();

  if (!email || !password || !cpassword)
    return res.status(400).send({
      ok: false,
      code: "EMAIL_AND_PASSWORD_REQUIRED",
      message: "Email and password are required",
    });

  if (password != cpassword)
    return res.status(401).send({
      ok: false,
      code: "PASSWORDS_UNMATCH",
      message: "passwords are unmatched",
    });

  try {

    if (await UserObject.findOne({ email }))
      return res.status(401).send({
        ok: false,
        code: "INVALID_USER",
        message: "Email is invalid",
      });

    const user = await UserObject.insertOne({email:email, first_name:first_name, last_name:last_name, password:password});

    user.set({ last_login_at: Date.now() });
    await user.save();

    const token = jwt.sign({ _id: user.id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  let { password, email } = req.body;
  email = (email || "").trim().toLowerCase();

  if (!email || !password)
    return res.status(400).send({
      ok: false,
      code: "EMAIL_AND_PASSWORD_REQUIRED",
      message: "Email and password are required",
    });

  try {
    const user = await UserObject.findOne({ email });

    if (!user)
      return res.status(401).send({
        ok: false,
        code: "INVALID_USER",
        message: "Email or password is invalid",
      });

    const match = await user.comparePassword(password);
      // config.ENVIRONMENT === "development" || (await user.comparePassword(password));
     
    if (!match)
      return res.status(401).send({
        ok: false,
        code: "EMAIL_OR_PASSWORD_INVALID",
        message: "Email or password is invalid",
      });

    user.set({ last_login_at: Date.now() });
    await user.save();

    const token = jwt.sign({ _id: user.id }, config.SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

// ===================================== UPDATE =====================================

router.put('/update/:id', async(req,res) => {
    try {
        const user = await UserObject.findById(req.params.id);

        if(!user)
        {
          return res.status(404).send({ ok:false, code:'user not found'});
        }

        user.set(req.body);
        await user.save();

        return res.status(200).send({ ok:true, user});
    } catch (error){
        console.log(error);
        res.status(500).send({ ok:false, code:SERVEUR_ERROR, error});
    }
});

// ===================================== DELETE =====================================

router.delete('/delete/:id', async(req,res) => {
    try {
        const user = await UserObject.findById(req.params.id);

        if(!user)
        {
          return res.status(404).send({ ok:false, code:'user not found'});
        }

        await user.remove();
        return res.status(200).send({ ok:true, user});
        
    } catch (error){
        console.log(error);
        res.status(500).send({ ok:false, code:SERVER_ERROR, error});
    }
});


module.exports = router;