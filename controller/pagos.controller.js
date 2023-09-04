const PagosModel = require("../model/pagos.model")
class PagosController
{
    static async readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo){
        return await PagosModel.readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo)
    }
}

module.exports = PagosController