exports.reqErrors = {
  forbidden: {
    ARTICLE_MESSAGE: 'No es posible eliminar las noticias de otros usuarios',
  },
  notFound: {
    ARTICLE_MESSAGE: 'Artículo no encontrado',
    AUTH_MESSAGE:
      'No se encontró el usuario con este correo electrónico o la contraseña es incorrecta',
  },
  conflict: {
    MONGO_ERROR_CODE: 11000,
    REGISTRATION_MESSAGE: 'El usuario con este e-mail ya está registrado',
  },
};

exports.authErrors = {
  unauthorized: {
    NOTOKEN_MESSAGE: 'Autorización requerida',
  },
};

exports.validationErrors = {
  url: {
    LINK_MESSAGE: 'Enlace de artículo incorrecto',
    IMAGE_MESSAGE: 'Enlace incorrecto a la imagen',
  },
  email: {
    EMAIL_MESSAGE: 'Email inválido',
  },
};
