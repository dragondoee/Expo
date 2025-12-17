const mongoose = require('mongoose');

const MODELNAME = 'note';

const Schema = new mongoose.Schema(
    {
        user_id: { type: String },
        title: { type: String, trim: true },
        content: { type: String, default: '' },
    },
    { timestamps: true }
)

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;