const DepartamentoModel = require("../model/departamento.model")
class DepartamentoController
{
    static async readTipoDepartamentoModel(){
        return await DepartamentoModel.readTipoDepartamentoModel()
    }

    static async readAllDepartamentoController(tipo_departamento){
        return await DepartamentoModel.readAllDepartamentoModel(tipo_departamento)
    }

    static async insertDepartamentoController(code_departamento,num_piso, detalle_departamento, id_tipo_departamento)
    {
        return await DepartamentoModel.insertDepartamentoModel(code_departamento,num_piso, detalle_departamento, id_tipo_departamento)
    }

    static async deleteDepartamentoController(code_departamento){
        return await DepartamentoModel.deleteDepartamentoModel(code_departamento)
    }

    static async updateDepartamentoController(detalle_departamento, id_tipo_departamento,num_piso,code_departamento){
        return await DepartamentoModel.updateDepartamentoModel(detalle_departamento, id_tipo_departamento,num_piso,code_departamento)
    }
}

module.exports = DepartamentoController