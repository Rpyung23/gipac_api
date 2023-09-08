const connDB = require("../config/conn")
class PagosModel
{
    static async readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select PD.id_pago_departamento,PD.detalle_comprobante,PD.fk_code_departamento,'' BancoEmisor,convert(date(PD.fecha_creacion),char(150)) fecha_creacion,PD.motivo,PD.code_referencia,PD.foto_url_deposito," +
                "PD.fk_email_usuario,U.nombre_usuario,U.telefono_usuario,PD.estado,TD.detalle_tipo_departamento," +
                "TD.precio_arriendo from pago_departamento as PD inner join usuario as U on " +
                "U.email_usuario = PD.fk_email_usuario inner join departamento as D on " +
                "PD.fk_code_departamento = D.code_departamento inner join tipo_departamento as TD on " +
                "TD.id_tipo_departamento = D.fk_id_tipo_departamento where PD.estado !=3 order by PD.fecha_creacion desc;"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async pagoArreindoAdminModel(id_pago_departamento_,estado_,detalle)
    {
        try {
            var detalle2 = detalle == null  ? '' : detalle
            var conn = await connDB().promise()
            await conn.query("update pago_departamento set estado = "+estado_+",detalle_comprobante = '"+detalle2+"' where id_pago_departamento = "+id_pago_departamento_)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = PagosModel