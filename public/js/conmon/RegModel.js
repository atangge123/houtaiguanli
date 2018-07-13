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
