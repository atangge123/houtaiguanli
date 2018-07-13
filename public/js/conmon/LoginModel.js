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
