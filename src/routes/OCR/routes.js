const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const {
    convertb64toText
} = require('../../controllers/OCR/index2')

router.post("/convertb64toText", async (req, res) => {
    var data = req.body;
    let result = await convertb64toText(data.base64).catch(error=>{
        res.send(error)
    });
    res.send(result);
})

module.exports = app => app.use('/routes', router);