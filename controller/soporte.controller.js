const SoporteModel = require("../model/soporte.model")
class SoporteController
{
    static async readAllTipoSoporteController(){
        return await SoporteModel.readAllTipoSoporteModel()
    }

    static async readAllSoporteController(tipo_soporte,email_receptor,estado_soporte)
    {
        return await SoporteModel.readAllSoporteModel(tipo_soporte,email_receptor,estado_soporte)
    }
}

module.exports = SoporteController