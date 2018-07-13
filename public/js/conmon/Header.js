const LoginModel=require("./LoginModel.js");
const RegModel = require("./RegModel.js");
function Header(){
    this.createDom();
    this.LoginModel();
    this.RegModel();
    this.checkLogin();
    this.addListen();
}
//头部布局模板
Header.template=`<nav class="navbar navbar-default navbar-inverse">
      <div class="container-fluid">
      
        <div class="navbar-header">
          <a class="navbar-brand" href="#">职位管理系统</a>
        </div>

     
        <div class="collapse navbar-collapse" id="position_nav">
          <ul class="nav navbar-nav">
            <li class="active"><a href="/index.html">首页</a></li>
            <li><a class="lia" href="#">职位管理</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li data-toggle="modal" data-target="#myModal"><a href="#">登录</a></li>
            <li data-toggle="modal" data-target="#regModal"><a href="#">注册</a></li>
          </ul>
           <ul class="nav navbar-nav navbar-right hide login_succes_yin">
            <li><a href="#">欢迎</a></li>
            <li class="loginout_btn"><a href="#">退出</a></li>
          </ul>
        </div>
      </div>
    </nav>`;
//extend是什么
//原型链继承
$.extend(Header.prototype,{
    //创建头部的
    createDom:function(){
        $(Header.template).appendTo('.header');
    },
    LoginModel:function(){
      new LoginModel();
    },
    RegModel:function(){
      new RegModel();
    },

    checkLogin:function(){
      $.get("/users/check",function(data){
         if(data.res_code===0){
          $(".login_succes_yin").removeClass("hide").prev("ul").addClass("hide");
          $(".login_succes_yin a:first").text("欢迎"+data.res_body.username);
         }
      });
    },

    addListen:function(){
        $(".loginout_btn").on("click",$.proxy(this.registerEventerListen,this));
    },

    registerEventerListen:function(){
      $.get("/users/loginout",function(data){
        location="/index.html";
      });
    }

});
module.exports = Header;
