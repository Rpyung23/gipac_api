require("./config/port")
const user = require("./view/user")
const rol = require("./view/rol")
const departamento = require("./view/departamento")
const soporte = require("./view/soporte")
const panel = require("./view/panel")
const pago = require("./view/pago")
const arrendamiento = require("./view/arrendamiento")
const banco = require("./view/banco")
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(user)
app.use(rol)
app.use(departamento)
app.use(soporte)
app.use(panel)
app.use(pago)
app.use(arrendamiento)
app.use(banco)

app.listen(process.env.PORT,function ()
{
    console.log(`SERVER API PORT ${process.env.PORT}`)
})
