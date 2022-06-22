const html2pdf = require('html-pdf')
const path = require('path');

exports.buildBase64 = (dataHeader, html) => {
    
    let thProcuradoria ="<th style='font-family: Arial, Helvetica, sans-serif; text-align: left;'>Procuradoria<br> de Atenção à Saúde</th>"                                                                                                                 
    let thImage = "<th><img src='data:image/" + dataHeader.sufix + ";base64," + dataHeader.base64image + "' alt='Logo PGM' style='display: none; width:351px; height:71px;'/></th>"
    
    html = thImage + html
    
    const options = {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait',
        header: {
            contents: "<table><tr>" + thImage.replace("none", "flex") + "<th style='width: 70px'></th>" + thProcuradoria + "</tr></table>"
        },
        border: {
            // "top": "2cm",        // default is 0, units: mm, cm, in, px
            "right": "2.09cm",
            "bottom": "1.75cm",
            "left": "2.5cm"
        },
    }

    return new Promise(result => {
        
        let goBack = {};
        
        try {
            html2pdf.create(html, options).toBuffer((err, buffer) => {
                
                var b64 = Buffer.from(buffer).toString('base64');
                
                goBack.success = true;
                goBack.base64 = b64;
                
                result(goBack);
            })
        } catch (error) {
            
            goBack.success = false;
            goBack.error = error;
            
            result(goBack);
        }
        
    })
}