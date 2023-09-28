const ReporteModel = require("../model/reporte.model")
class ReporteController
{
    static async Report1Controller(){
        return await ReporteModel.Report1Model()
    }

    static async Report2Controller(fechaI,fechaF){
        return await ReporteModel.Report2Model(fechaI,fechaF)
    }

    static async ReporteReservaController(fechaI,fechaF){
        return await ReporteModel.ReporteReservaModel(fechaI,fechaF)
    }

    static async ReporteRubroController(fechaI,fechaF){
        return await  ReporteModel.ReporteRubroModel(fechaI,fechaF)
    }
}

module.exports = ReporteController