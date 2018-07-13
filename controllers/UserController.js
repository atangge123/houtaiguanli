//用户相关的控制器
const usermodale = require("../models/UserModale");
var UserController = {
  
    register:function(req,res,next){
       const {username,password,emaile}=req.query;
       // res.send({username,password,emaile});
       usermodale.save({username,password,emaile},(msg)=>{
            res.json({res_code:0,res_error:"",res_body:msg});
       },(err)=>{
             res.json({res_code:-1,res_error:err,res_body:{}});
       });
    },

    login:function(req,res,next){
      const {username,password}=req.body;

      usermodale.find({username,password},(data)=>{

        if(data.length===1){
           req.session.loginUser = data[0].username;
          res.json({res_code:0,res_error:"",res_body:data});
        }else{
           res.json({res_code:-2,res_error:"",res_body:{}});
        }
      },(err)=>{
         res.json({res_code:-1,res_error:"err",res_body:{}});
      });
    },


    check:function(req,res,next){
    var user = req.session.loginUser;
      if(user){
        res.json({res_code:0,res_error:"",res_body:{username:user}});
      }else{
         res.json({res_code:-1,res_error:"错误",res_body:{}});
      }
    },

    loginout:function(req,res,next){
      req.session=null;
      res.json({res_code:-1,res_error:"cl",res_body:{}});
    }
};
module.exports = UserController;
