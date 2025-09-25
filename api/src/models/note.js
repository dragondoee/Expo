const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MODELNAME = 'note';

const Schema = new mongoose.Schema(
    {
        user_id:{type:ObjectId},
        folder_id:{type:ObjectId},
        title:{type: String, trim: true},
        text:{type: String},
        datcre:{type: Date, default: Date.now},
    },
    { timestamps: true}
)

const OBJ=  mongoose.model(MODELNAME, Schema);
module.exports = OBJ;