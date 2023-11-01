import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import chatRouter from './routes/chat.js'
import viewsRouter from './routes/views.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { mensajeModel } from './dao/models/mensajes.model.js';

// IMPORTAMOS MONGO Y SESSION
import MongoStore from 'connect-mongo';
import session from 'express-session';

// IMPORTAR VIEWSROUTER
import viewRouter from './routes/viewsRouter.js'

// IMPORT USERROUTER
import userRouter from './routes/userRouter.js'

// IMPORT INITIALIZE
import initializePassport from './config/passport.config.js';
import passport from 'passport';

// IMPORT DOTENV
import 'dotenv/config'

mongoose.connect(
  process.env.MONGO_URL
)

const app = express();
const PORT = 8080;
const httpServer = app.listen(8080, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views')
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'))

// USAMOS SESSION

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl:15
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}))

app.get('/realtimeproducts', (req,res) => {
  res.render('realTimeProducts' , {pageTitle: 'Productos en Tiempo real'})
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chat' , chatRouter );
app.use('/views', viewsRouter)

// USE VIEWROUTER
app.use('/api', userRouter)
app.use('/', viewRouter);

initializePassport();
app.use(passport.initialize())
app.use(passport.session())


socketServer.on('connection' , (socket) => {
  console.log("se conecto ", (socket.id));
  socket.on('mensaje' , async (data) => {
    await mensajeModel.create(data);
    const mensajes = await mensajeModel.find().lean()
    socketServer.emit('nuevo_mensaje' , mensajes )
  })
})