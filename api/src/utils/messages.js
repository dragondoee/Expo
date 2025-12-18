module.exports = {
  user: {
    NOT_FOUND: {
      code: "USER_NOT_FOUND",
      message: "Utilisateur non trouvé",
    },
    CREATED: {
      code: "USER_CREATED",
      message: "Utilisateur créé avec succès",
    },
    UPDATED: {
      code: "USER_UPDATED",
      message: "Utilisateur mis à jour",
    },
    DELETED: {
      code: "USER_DELETED",
      message: "Utilisateur supprimé",
    },
    ALREADY_EXISTS: {
      code: "USER_ALREADY_EXISTS",
      message: "Adresse email déjà utilisée",
    },
  },

  note: {
    NOT_FOUND: {
      code: "NOTE_NOT_FOUND",
      message: "Note non trouvée",
    },
    CREATED: {
      code: "NOTE_CREATED",
      message: "Note créée avec succès",
    },
    UPDATED: {
      code: "NOTE_UPDATED",
      message: "Note mise à jour",
    },
    DELETED: {
      code: "NOTE_DELETED",
      message: "Note supprimée",
    },
  },

  auth: {
    INVALID_CREDENTIALS: {
      code: "INVALID_CREDENTIALS",
      message: "Email ou mot de passe invalide",
    },
    REQUIRED: {
      code: "AUTH_REQUIRED",
      message: "Email et mot de passe sont requis",
    },
    TOKEN_REQUIRED: {
      code: "TOKEN_REQUIRED",
      message: "Token requis",
    },
  },

  server: {
    ERROR: {
      code: "SERVER_ERROR",
      message: "Erreur serveur",
    },
    INVALID_ID: {
      code: "INVALID_ID",
      message: "ID invalide",
    }
  },
};
