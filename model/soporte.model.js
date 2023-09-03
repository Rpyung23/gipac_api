const connDB = require("../config/conn")
class SoporteModel
{
    static async readAllTipoSoporteModel()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select * from tipo_soporte where estado = 1")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readAllSoporteModel(tipo_soporte,email_receptor,estado_soporte)
    {
        var oSqlTipoSoporte = ""
        var oSqlEstadoSoporte = ""
        if(Array.isArray(tipo_soporte))
        {
            oSqlTipoSoporte = " where table1.fk_tipo_soporte in ("+tipo_soporte+") "
        }

        if(Array.isArray(estado_soporte))
        {
            oSqlEstadoSoporte = (oSqlTipoSoporte == "" ? " where " : " and ")+ " table1.estado in ("+estado_soporte+") "
        }

        try {
            var conn = await connDB().promise()
            var sql = "select * from  (select S.id_soporte,S.fk_tipo_soporte,convert(date(S.fecha_apertura),char(150)) fecha_apertura,S.detalle_soporte," +
                "S.usuario_emisor_ticket,S.url_img,S.url_archivo,S.asunto_soporte,S.estado,U.nombre_usuario,U.telefono_usuario," +
                "TS.detalle_soporte as detalle_tipo_soporte from soporte as S inner join tipo_soporte as TS on " +
                "TS.id_tipo_soporte = S.fk_tipo_soporte inner join usuario as U on U.email_usuario = S.usuario_emisor_ticket " +
                "where S.estado in (1,2) or S.usuario_receptor_ticket = '"+email_receptor+"' or ISNULL(S.usuario_receptor_ticket)) table1 "+oSqlTipoSoporte+oSqlEstadoSoporte+ " order by fecha_apertura asc"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async
}

module.exports = SoporteModel