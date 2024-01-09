import { userModel } from "../dao/models/user.model.js";

const updateLastConnectionMiddle = async (req,res, next) => {
    try {
        // Suponiendo que tienes información del usuario en tu objeto de solicitud (req.user)
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado');
        }

        await user.updateLastConnection();

        console.log('last_connection actualizada con éxito');
        next();  // Continuar con el flujo de la solicitud después de actualizar last_connection
    } catch (err) {
        console.error('Error al actualizar last_connection:', err);
        return res.status(500).send('Error al actualizar last_connection');
    }
}


export default updateLastConnectionMiddle;