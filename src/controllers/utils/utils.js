let spawn = require("child_process").spawn;
let path= require('path');


exports.callPythonScript = async (nameScriptPython, listDocumentPaths)=>{

    return new Promise(async (resolve, reject)=>{
        const projectRootPath = path.resolve(__dirname);
        let pathPyton = projectRootPath + "\\python\\" + nameScriptPython;
        let pathFileTemp = './files/' + Math.floor(Date.now() * Math.random()).toString(36) + ".txt"
       
        let process = await spawn('python', [pathPyton, listDocumentPaths, pathFileTemp]);
        
        process.stdout.on('data', function (data) {
            resolve(pathFileTemp);
        })
    })
}