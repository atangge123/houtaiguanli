//用户相关的控制器
const PositionModulse = require("../models/PositionModulse");
var PositionController = {
  
       add:function(req,res,next){

        const {zhiwei,xinzi,didian,youxiang}=req.body;
        
        if(req.file){
          const logo="/img/upload/"+req.file.filename;//上传文件的文件名；
          PositionModulse.save({zhiwei,xinzi,didian,youxiang,logo},function(data){
          res.json({res_code:1,res_error:"",res_body:{data}});
        });
        }else{
          PositionModulse.save({zhiwei,xinzi,didian,youxiang},function(data){
          res.json({res_code:1,res_error:"",res_body:{data}});
        });
        }
      },
      list : function(req, res, next) {
          // 从请求中获取查询的页码
          const {pageIndex} = req.query;

          // 按页查询
          PositionModulse.findpage(pageIndex, (data)=>{
            // data 中放的是查询成功的数据
            res.json({
              res_code : 0,
              res_error : "",
              res_body : data
            })
          }, (err)=>{
            res.json({
              res_code : -1,
              res_error : err,
              res_body : {}
            })
          });
        },
        listt:function(req,res,next){
          PositionModulse.find({},(msg)=>{
            res.json({res_code:0,res_error:"",res_body:msg});
          },(err)=>{
             res.json({res_code:-1,res_error:"err",res_body:err});
          });
        },
     
      deletef:function(req,res,next){
        const {_id} = req.query;
        PositionModulse.removede({_id},function(data){
          res.json({res_code:1,res_error:"",res_body:data});
        });
      },

      modify:function(req,res,next){
        const {_id,zhiwei,xinzi,didian,youxiang}=req.body;
        // res.send(req.body);
        if(req.file){
           const logo="/img/upload/"+req.file.filename;
          PositionModulse.update({_id},{zhiwei,xinzi,didian,youxiang,logo},function(data){
            res.json({res_code:0,res_error:"",res_body:data});
          },(err)=>{
            res.json({res_code:-1,res_error:"err",res_body:{}});
          });
        }else{
          PositionModulse.update({_id},{zhiwei,xinzi,didian,youxiang},(msg)=>{
            res.json({res_code:0,res_error:"",res_body:msg});
          },(err)=>{
            res.json({res_code:-1,res_error:"err",res_body:{}});
          });
        }
       
      },

      temp:function(req,res,next){
        const {_id} = req.query;
       PositionModulse.findByid(_id,(msg)=>{
        res.json({res_code:0,res_error:"",res_body:msg});
       },(err)=>{
        res.json({res_code:-1,res_error:"err",res_body:{}});
       });
      }
      // limit skip
};
module.exports = PositionController;
