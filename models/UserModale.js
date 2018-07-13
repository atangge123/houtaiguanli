const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/h51802");
const schema = mongoose.Schema({
    username:String,
    password:String,
    emaile:String
});
const Position = mongoose.model("position",schema);

var UserModale={
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
    find:function(userinfo,success,error){
        Position.find(userinfo).then(success,error);
    }
}
module.exports = UserModale;
