const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/h51802");
const schema = mongoose.Schema({
    zhiwei:String,
    xinzi:String,
    didian:String,
    youxiang:String,
    logo:String
});
const Position = mongoose.model("kaishi",schema);

var PositionModulse={
    save:function(userinfo,success,error){
        let User = new Position(userinfo);
         User.save((err,userinfo)=>{
            if(err){
                error(err);
                return;
            }
            success(userinfo);
         });
    },
    findpage:function(pageIndex,success,error){
        const pageSite=5;
        
        Position.find().limit(pageSite).skip((pageIndex-1)*pageSite).then(success,error);
    },

    find:function(pageIndex,success,error){
        Position.find(pageIndex).then(success,error);
    },

    removede:function(_id,success,error){
        Position.remove(_id).then(success,error);
    },

    findByid:function(_id,success,error){
        Position.findById({_id}).then(success,error);
    },
    update:function(_id,ers,success,error){
        Position.update(_id,ers).then(success,error);
    }
}
module.exports = PositionModulse;
