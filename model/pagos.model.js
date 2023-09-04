const connDB = require("../config/conn")
class PagosModel
{
    static async readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select PD.fk_code_departamento,convert(date(PD.fecha_creacion),char(150)) fecha_creacion,PD.motivo,PD.code_referencia,PD.foto_url_deposito," +
                "PD.fk_email_usuario,U.nombre_usuario,U.telefono_usuario,PD.estado,TD.detalle_tipo_departamento," +
                "TD.precio_arriendo from pago_departamento as PD inner join usuario as U on " +
                "U.email_usuario = PD.fk_email_usuario inner join departamento as D on " +
                "PD.fk_code_departamento = D.code_departamento inner join tipo_departamento as TD on " +
                "TD.id_tipo_departamento = D.fk_id_tipo_departamento where PD.estado !=3 and date(PD.fecha_creacion) " +
                "between '"+fechaI+"' and '"+fechaF+"' order by PD.fecha_creacion desc;"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = PagosModel