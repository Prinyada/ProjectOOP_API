//const { Upload } = require("antd");
var express = require("express");
var router = express.Router();
var fs = require('fs');
const { basename } = require("path");
var path = require('path');

const myPath = "C:\\Users\\USER\\Desktop\\tG"; // path file photo

var createData = (dir) =>{
    let files = fs.readdirSync(dir);
    let tempArray = [];
    files.forEach(function (file) {
        var newPath = path.join(dir,file);
        if(fs.lstatSync(newPath).isDirectory()==true){
            var tempTitle =
            {
                title: path.basename(newPath),
                subtitle: newPath,
                children: createData(newPath)
            }
            tempArray.push(tempTitle);
        }
        else{
            var tempTitle = 
            {
                title: path.basename(newPath),
                subtitle: newPath
            }
            tempArray.push(tempTitle);
        }
    })
    return tempArray;
}
var getImage = () => {
    router.get("/image",function(req,res,next){
        let tempPath = req.url.split("=")[1].replace(/%5C/g,"/");
        console.log(tempPath);
        if(fs.lstatSync(tempPath).isDirectory()==false)
        {
            let data = fs.readFileSync(tempPath);
            let tempdata = new Buffer.from(data).toString('base64');
            res.send(tempdata);
        }
        else
        {
            res.send("no file");
        }
        
    })
}
getImage();
var setdata = 
[
    {
        title: path.basename(myPath),
        children: createData(myPath) 
    }
]
console.log("complete")

router.get("/",function(req,res,next){
    res.send(setdata);
})


module.exports=router;