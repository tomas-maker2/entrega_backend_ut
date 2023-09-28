import mongoose from "mongoose";

const mensajeCollection = 'mensajes';

const mensajeSchema = new mongoose.Schema({
    correo: {
        type: String,
        require: true
    },
    mensaje: {
        type: String,
        require: true
    }
})

const mensajeModel = mongoose.model(mensajeCollection, mensajeSchema);
export {mensajeModel};