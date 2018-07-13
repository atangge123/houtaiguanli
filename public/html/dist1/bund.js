/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const List = __webpack_require__(1);
const Header = __webpack_require__(2);
function position(){
    this.createDom();
    this.creatList();
}
position.prototype={
      createDom:function(){
        new Header();
        $("#position_nav ul:first li:last").addClass("active").siblings().removeClass("active");
    },
    creatList:function(){
        new List();
    }
};
new position();


/***/ }),
/* 1 */
/***/ (function(module, exports) {


function List(){
    this.addListen();
    this.listposition(1);
    this.listenmogoo();
    // this.modify();
    // this.addListenjj();
}
List.prototype={
    addListen:function(){
        const that = this;
        $(".position_form").on("click",$.proxy(this.addPosition,this));
        $(".modifybtn").on("click",$.proxy(this.modify,this));
        $(".pagination").on("click","a",function(){
            const num = $(this).text();
            // console.log(num);
            that.listposition(num);
            // location.reload();
            return false;
        });
    },

    addPosition:function(){
        var formData=new FormData($(".pos_form")[0]);
        $.ajax({
            type:"post",
            url:"/position/add",
            data:formData,
            processData:false,
            contentType:false,
            success:function(data){
                $("#positionModal").modal("hide");
                location.reload();
            }
        });
    },
    deleteff:function(id){
        $.get("/position/deletef",id,function(data){
            location.reload();
        });
    },

    listposition:function(pageIndex){
        var that=this;
        $.get("/position/list",{pageIndex},function(data){
            const html = template("list_template",{list:data.res_body});
            $(".tab_position tbody").html(html);

            $(".delete").click(function(){
                const _id = $(this).data("id");
                that. deleteff({_id});
            });
             $(".modify").click(function(){
                const _id = $(this).data("id");
                that. templatexr({_id});
            });
        });
    },

//动态添加翻页标签
    listenmogoo:function(){
        $.get("/position/listt",function(data){
           const len = Math.ceil(data.res_body.length/5);
           let ht="";
           for(var i=1;i<=len;i++){
            ht+=`<li><a href="#">${i}</a></li>`
           }
           $(".pagination").html(ht);
        });
    },

    templatexr:function(id){
        $.get("/position/temp",id,function(data){
           $("._id").val(data.res_body._id);
           $(".zhiwei").val(data.res_body.zhiwei);
           $(".xinzi").val(data.res_body.xinzi);
           $(".didian").val(data.res_body.didian);
           $(".youxiang").val(data.res_body.youxiang);
        });
    },

    modify:function(){
        var formData=new FormData($(".pos_form2")[0]);
        $.ajax({
            type:"post",
            url:"/position/modify",
            data:formData,
            processData:false,
            contentType:false,
            success:function(data){
                $("#positionModal").modal("hide");
                location.reload();
                console.log(data);
            }
        });
    }
  
};
module.exports=List;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const LoginModel=__webpack_require__(3);
const RegModel = __webpack_require__(4);
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function LoginModel(){
    this.createDom();
    this.addListen();
}
LoginModel.template=`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">登录</h4>
      </div>
      <div class="modal-body">
      <div class="alert alert-danger hide login_error" role="alert">用户名或密码错误，请稍后重试...</div>
        <form class="login_form">
           <div class="form-group">
              <label for="exampleInputEmail1">用户名</label>
              <input type="text" name="username" class="form-control" id="userInputusername" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">密码</label>
              <input type="password" name="password" class="form-control" id="userInputPassword" placeholder="请输入密码">
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary logon_btn">确定登录</button>
      </div>
    </div>
  </div>
</div>`;
$.extend(LoginModel.prototype,{
    createDom:function(){
        $(LoginModel.template).appendTo("body");
    },
    addListen:function(){
      $(".logon_btn").on("click",$.proxy(this.registerEventerListen,this));
    },
    registerEventerListen:function(){
      $.post("/users/login",$(".login_form").serialize(),function(data){
        if(data.res_code===0){
          window.location.href="/html/list.html";
        }else{
          $(".login_error").removeClass("hide");
        }

      });
    }
});
module.exports = LoginModel;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function RegModel(){
    this.createDom();
    this.addListen();
}
RegModel.template=`<div class="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close"  data-dismiss="modal"aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">注册</h4>
      </div>

      <div class="modal-body">

          <div class="alert alert-danger hide reg_error" role="alert">用户注册失败，请稍后重试...</div>
         <form class="register_form">

            <div class="form-group">
              <label for="exampleInputEmail1">用户名</label>
              <input type="text" name="username" class="form-control" id="regesterInputusername" placeholder="请输入用户名">
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">密码</label>
              <input type="password" name="password" class="form-control" id="regesterInputPassword" placeholder="请输入密码">
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">确认密码</label>
              <input type="password" name="passwordtest" class="form-control" id="regesterInputPassword1" placeholder="请再输入密码">
            </div>
            
            <div class="form-group">
              <label for="exampleInputPassword1">邮箱</label>
              <input type="text" name="emaile" class="form-control" id="regesterInputEmaile" placeholder="请输入邮箱">
            </div> 

          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary register_btn">确定注册</button>
      </div>
    </div>
  </div>
</div>`;
RegModel.prototype={
    createDom:function(){
        $(RegModel.template).appendTo("body");
    },
    //注册监听事件
    addListen:function(){
      $(".register_btn").on("click",$.proxy(this.registerEventerListen,this));
    },
    registerEventerListen:function(){
      $.get("/users/register",$(".register_form").serialize(),function(data){
         console.log(data);
        if(data.res_code===0){
          $("#regModal").modal("hide");
        }else{
         $(".reg_error").removeClass("hide");
        }
      });
    }
}
module.exports = RegModel;


/***/ })
/******/ ]);