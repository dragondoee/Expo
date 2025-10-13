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

// 🔐 Middleware : hasher le mot de passe avant de sauvegarder
Schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔎 Méthode pour comparer un mot de passe donné avec le hash
Schema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const OBJ=  mongoose.model(MODELNAME, Schema);
module.exports = OBJ;