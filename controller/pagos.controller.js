const PagosModel = require("../model/pagos.model")
class PagosController
{
    static async readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo){
        return await PagosModel.readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo)
    }

    static async pagoArreindoAdminController(id_pago_departamento_,estado_,detalle){
        return await PagosModel.pagoArreindoAdminModel(id_pago_departamento_,estado_,detalle)
    }
}

module.exports = PagosController