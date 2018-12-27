const fs = require("fs");
const crypt = require("crypto");

const getenc = function (file, pwd, cb) {
// null checking.
  fs.readFile(file,{encoding:'utf8'}, function(err, data){
    if(err) { console.log("error reported in reading file "); cb(new Error(), "ERROR:Reading file"); }

    if(data != null || data != undefined ) {
      var cipher = crypt.createCipher("aes-256-ctr", pwd);
      var crypted = cipher.update(data,'utf8','base64');
      crypted += cipher.final('base64');

      fs.writeFile(file+".enc", crypted,{encoding:'utf8'}, function(err) {
        if(err) { console.log("error reported in writing to file "+file+".enc"); cb(new Error(), "ERROR:Writing file"); }
        else { console.log(" Encrypted file created and written to file "+file+".enc");
          cb(null, " Encrypted file created and written to file "+file+".enc")
        }
      });
    }
  });
};

const getdec = function (file, pwd, cb) {
  fs.readFile(file,{encoding:'utf8'}, function(err, data){
    if(err) { console.log("error reported in reading file "); cb(new Error(), "ERROR:Reading file"); }
    //console.log(data);
    if(data != null || data != undefined ) {
      var dcipher = crypt.createDecipher("aes-256-ctr", pwd);
      var crypted = dcipher.update(data, 'base64', 'utf8');
      crypted += dcipher.final('utf8');

      fs.writeFile(file+".dec", crypted,{encoding:'utf8'}, function(err) {
        if(err) { console.log("error reported in writing to file "+file+".dec"); cb(new Error(), "ERROR:Writing file"); }
        else { console.log(" Encrypted file created and written to file "+file+".dec");
          cb(null, " Decrypted file created and written to file "+file+".dec")
        }
      });
    }
  });
}

module.exports = { getenc, getdec };
