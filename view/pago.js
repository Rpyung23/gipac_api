require("../utils/jwt")
const express = require("express")
const app = express()
const {createToken, ensureToken} = require("../utils/jwt");
const PagosController = require("../controller/pagos.controller");


app.post("/all_pagos_admin",ensureToken,async function(req,res)
{
    try {
        var data = await PagosController.readPagoAdminModel(req.body.fechaI,req.body.fechaF,req.body.code_depa,
            req.body.recibo,req.body.tipo)

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