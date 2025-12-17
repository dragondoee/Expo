const mongoose = require('mongoose');

const MODELNAME = 'note';

const Schema = new mongoose.Schema(
    {
        user_id: { type: String },
        /* folder_id: { type: Types.ObjectId }, */
        title: { type: String, trim: true },
        content: { type: String },
        datcre: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;