import connection from './connection_database.js'
import { NotFoundUser } from "../squemas/errors_squemas.js";


export class HomeAuxilModel {
    static async getData(req, res) {
        const [[data1]] = await connection.query(`SELECT COUNT(*) AS total_facturas
        FROM facturas;
        `)
        const [[data2]] = await connection.query(`SELECT COUNT(*) AS total_clientes_activos
        FROM clientes
        WHERE estado_cliente = 1;        
        `)
        const [[data3]] = await connection.query(`SELECT COUNT(*) AS total_desparacitaciones
        FROM desparacitaciones;
        `)
        const [[data4]] = await connection.query(`SELECT COUNT(*) AS total_citas_activas
        FROM cita
        WHERE estado_cita = 1;
        `)
        return ({ ...data1, ...data2, ...data3, ...data4 })
    }
}