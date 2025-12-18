const { isStrongPassword } = require("./password");

// validation pour l'inscription (Signup)
const validateSignup = (data) => {
  const { email, password } = data;
  if (!email || !password) {
    return "Email et mot de passe sont requis.";
  }
  if (!isStrongPassword(password)) {
    return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Format d'email invalide.";
  }
  return null;
};

// validation pour la connexion 
const validateLogin = (data) => {
  const { email, password } = data;
  if (!email || !password) {
    return "Email et mot de passe sont requis.";
  }
  return null;
};



module.exports = {
  validateSignup,
  validateLogin
};