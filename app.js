const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');

const limiter = require('./middlewares/limiter');
const indexRoutes = require('./routes/index');
const AuthRoutes = require('./routes/auth');
const NotFoundErr = require('./errors/NotFoundErr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

/* inclúyelos antes de otras rutas */
app.use(cors());
app.options('*', cors()); /* habilitar las solicitudes de todas las rutas */

/* express.json() is a method inbuilt in express to recognize the incoming Request as a JSON */
app.use(express.json());

app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.use('/', indexRoutes);
app.use('/', AuthRoutes);

/* set route for Non-existent address or localhost:3000 */
app.all('/*', () => {
  throw new NotFoundErr('Recurso solicitado no encontrado');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:7EQz2lCXSEowecEoVhL4@containers-us-west-22.railway.app:5879'
);
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  }
};

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
  connectDB();
});
