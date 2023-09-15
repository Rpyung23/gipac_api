const  BancoModel = require("../model/banco.model")
class BancoController
{
    static async readTipoBancoController()
    {
        return await BancoModel.readTipoBancoModel()
    }

    static async readMiCuentaBancariasController(usuario)
    {
        return await BancoModel.readMiCuentaBancariasModel(usuario)
    }


}

module.exports = BancoController