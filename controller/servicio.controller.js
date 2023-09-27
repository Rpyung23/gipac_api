const ServicioModel = require("../model/servicio.model")
class ServicioController
{
    static async readTipoServicioController()
    {
        return await ServicioModel.readTipoServicioModel()
    }

    static async readAllReservasController(fecha,servicios){
        return await ServicioModel.readAllReservasModel(fecha,servicios)
    }

    static async insertNuevoServicioController(name,horaI,horaF)
    {
        return await ServicioModel.insertNuevoServicioModel(name,horaI,horaF)
    }

    static async updateEstadoServicioController(servicio,estado){
        return await ServicioModel.updateEstadoServicioModel(servicio,estado)
    }
}
module.exports = ServicioController