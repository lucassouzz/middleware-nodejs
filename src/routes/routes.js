const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const {
    convertb64toText
} = require('../controllers/OCR')

const {
    buildBase64
} = require('../controllers/html2pdf')

router.post("/html2pdf", async (req, res) => {
    var {dataHeader, html} = req.body
    let result = await buildBase64(dataHeader, html);
    res.send(result)
})

router.post("/convertb64toText", async (req, res) => {
    var data = req.body;
    let result = await convertb64toText(data.base64).catch(error=>{
        res.send(error)
    });
    res.send(result);
})

module.exports = app => app.use('/routes', router);