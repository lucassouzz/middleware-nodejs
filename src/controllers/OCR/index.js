const fs = require("fs");
const pdfConvert = require('pdf-poppler');
const PDFDocument = require('pdf-lib').PDFDocument;
const { callPythonScript } = require('../utils/utils')

exports.convertb64toText = async (b64) => {
    
    let paths = [];
    let text = "";
    let resp = {
        success: true
    }
    
    return new Promise(async (resolve, reject) => {
        try {
            
            const contextPDF = './files/' + Math.floor(Date.now() * Math.random()).toString(36) + '.pdf';
            const pathPDF = await escrevePDF(b64, contextPDF)
            .catch(error => {
                resp = {
                    success: false,
                    message: "Não foi possível escrever o documento PDF com o código base64 enviado.",
                    error: error
                }
                reject(resp);
            });
            
            const numberOfPage = await getAllPage(pathPDF);
            
            const objImage = await convertePDFtoImage(pathPDF)
            .catch(err => {
                resp = {
                    success: false,
                    message: "Não foi possível converter o documento PDF em imagem.",
                    error: err
                }
                reject(resp);
            });
            
            let pathImgFormated
            let pathPython = [];
            for (let i = 1; i <= numberOfPage; i++) {
                if (i < 10 && numberOfPage > 10) {
                    pathImgFormated = objImage.path + "0" + i + objImage.format
                    pathPython.push(pathImgFormated.replace(/\\/g, "/"));
                } else {
                    pathImgFormated = objImage.path + i + objImage.format
                    pathPython.push(pathImgFormated.replace(/\\/g, "/"));
                }
                paths.push(pathImgFormated)
            }
            
            let fileToRead = await callPythonScript('ocr.py', pathPython);
            let textos = await readFile(fileToRead);
            
            paths.push(fileToRead)
            paths.push(pathPDF)
            deleteFile(paths)
            
            resp = {
                success: true,
                message: "Leitura do documento realizada com sucesso.",
                text: textos
            }
            
            resolve(resp);
            
        } catch (error) {
            
            let resp = {
                success: false,
                message: "Não foi possível realizar efetuar a leitura do documento, ocorreu algo inesperado.",
                error: error
            }
            reject(resp);
        }
    })
}

function escrevePDF(b64, contextPDF) {
    return new Promise((resolve, reject) => {
        
        fs.writeFile(contextPDF, b64, { encoding: 'base64' }, async function (err) {
            if (err) {
                reject(err)
            }
            resolve(contextPDF)
        })
    })
}


function convertePDFtoImage(file) {
    return new Promise((resolve, reject) => {
        let name = Math.floor(Date.now() * Math.random()).toString(36)
        
        let opts = {
            format: 'png',
            out_dir: './files',
            out_prefix: name,
            page: null
        }
        
        pdfConvert.convert(file, opts)
        .then(res => {
            let pathPNG = {}
            pathPNG.path = `${opts.out_dir}\\${opts.out_prefix}-`
            pathPNG.format = `.${opts.format}`
            resolve(pathPNG)
        })
        .catch(error => {
            reject(error)
        })
        
    })
}

function deleteFile(pathFile) {
    for (let i = 0; i < pathFile.length; i++) {
        fs.unlink(pathFile[i], function (err) {
            if (err)
            console.log(err)
        });
    }
    
}


async function getAllPage(localPDF) {
    try {
        const docmentAsBytes = await fs.promises.readFile(localPDF)
        const pdfDoc = await PDFDocument.load(docmentAsBytes)
        const numberOfPages = pdfDoc.getPages().length;
        return numberOfPages;
    } catch (error) {
        console.log(error)
    }
}


function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'latin1', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(data)
        });
    })
    
}