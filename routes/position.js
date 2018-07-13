var express = require('express');
var router = express.Router();
var PositionController=require("../controllers/PositionController");
var multer = require("multer");
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/img/upload");//将上传文件保存到public下的upload字目录中；
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+file.originalname.slice(file.originalname.lastIndexOf(".")));
    }
});
var upload = multer({storage:storage});
router.post("/add",upload.single("logo"),PositionController.add);
router.get("/list",PositionController.list);
router.get("/listt",PositionController.listt);
router.get("/deletef",PositionController.deletef);
router.post("/modify",upload.single("logo"),PositionController.modify);
router.get("/temp",PositionController.temp);
//  GET users listing
// router.get('/position',PositionController.position);
module.exports = router;
