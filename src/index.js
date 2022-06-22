const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const CONFIG = require('../config.json')

const PORT = CONFIG.server.PORT

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '50mb',extended: false }))

require('./routes/routes.js')(app)

app.listen(PORT , ()=>{
    console.log(`Executando na port ${PORT}`)
})
