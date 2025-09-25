const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MODELNAME = 'folder';

const Schema = new mongoose.Schema(
    {
        user_id:{type:ObjectId},
        name:{type: String}
    },
    { timestamps: true}
)

const OBJ=  mongoose.model(MODELNAME, Schema);
module.exports = OBJ;