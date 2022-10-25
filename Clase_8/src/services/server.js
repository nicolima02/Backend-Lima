const express = require("express")
const mainRouter = require("../routes/index.js")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))




app.use("/api", mainRouter)
app.use(express.static("public"))

module.exports = app