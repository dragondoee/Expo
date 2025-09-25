const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MODELNAME = 'user';

const Schema = new mongoose.Schema(
    {
        email:{type: String, unique: true, required: true, trim: true},
        first_name:{type: String, trim: true},
        last_name:{type: String, trim: true},
        password: String,
        forgot_password_reset_token:{type: String, default:''},
        forgot_password_reset_expires:{type: Date},
        last_login_at:{type: Date, default: Date.now},
    },
    { timestamps: true}
)

const OBJ=  mongoose.model(MODELNAME, Schema);
module.exports = OBJ;