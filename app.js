const express = require('express')

const app = express()


app.use(express.static('view'))

app.use(express.static('model'))

module.exports = app