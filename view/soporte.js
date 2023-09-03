require("../utils/jwt")
const express = require("express")
const app = express()
const {createToken, ensureToken} = require("../utils/jwt");
const SoporteController = require("../controller/soporte.controller");



app.get("/all_tipo_soporte",async function(req,res){
    try {
        var data = await SoporteController.readAllTipoSoporteController()

        res.status(200).json({
            status_code: data.length > 0 ? 200 : 300,
            msm: data.length > 0 ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
            datos: data
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
            datos:[]
        })
    }
})

app.post("/all_soporte",ensureToken,async function(req,res)
{
    try {
        var data = await SoporteController.readAllSoporteController(req.body.tipo_soporte,req.body.data.CodiUsua,req.body.estado_soporte)

        res.status(200).json({
            status_code: data.length > 0 ? 200 : 300,
            msm: data.length > 0 ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
            datos: data
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
            datos:[]
        })
    }
})


module.exports = app