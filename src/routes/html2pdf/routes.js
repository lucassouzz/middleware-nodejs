const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const {
    buildBase64
} = require('../../controllers/html2pdf/html2pdf')

router.post("/html2pdf", async (req, res) => {
    var data = req.body
    console.log(data.html)
    let result = await buildBase64(data.html);
    res.send(result)
})

module.exports = app => app.use('/routes', router)