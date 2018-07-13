
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
