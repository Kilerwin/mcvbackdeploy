import connection from './connection_database.js'
import { NotFoundUser } from "../squemas/errors_squemas.js";

export class AgendaModel {
    static async getAgendas(id_usuario) {
        try {
            const query = ` SELECT 
            BIN_TO_UUID(c.id_cita) id,
            c.fecha_cita,
            c.Hora_cita,
            c.asistencia_cita,
            c.estado_cita,
            BIN_TO_UUID(c.id_empleado) AS id_empleado,
            s.descripcion_servicio,
            m.nombre_mascota,
            cl.primer_nombre_cliente,
            cl.primer_apellido_cliente,
            c.anotacion_cita
        FROM 
            cita c
        INNER JOIN 
            empleados e ON c.id_empleado = e.id_empleado
        INNER JOIN 
            usuarios u ON e.id_usuario = u.id_usuario
        INNER JOIN 
            mascotas m ON c.id_mascota = m.id_mascota
        INNER JOIN 
            clientes cl ON m.id_cliente_mascota = cl.id_cliente
        INNER JOIN 
            servicios s ON c.id_servicio = s.id_servicio
        WHERE 
            u.id_tipo_usuario = ? AND estado_cita = 1; `
            const response = await connection.query(query, [id_usuario.id_usuario])
            return response
        } catch (error) {
            console.log(error)
        }
    }
    static async deleteCita({ id, input }) {
        try {
            const { anotacion } = input;
            const [[existencia]] = await connection.query(
                `SELECT estado_cita FROM cita
            WHERE id_cita = UUID_TO_BIN(?) AND estado_cita = 0`,
                [id]
            );

            if (existencia) throw new AccountAlreadyDisable();

            const [res] = await connection.query(
                `UPDATE cita
            SET anotacion_cita = ?, estado_cita = 0
            WHERE id_cita = UUID_TO_BIN(?)`,
                [anotacion, id]
            );

            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

}