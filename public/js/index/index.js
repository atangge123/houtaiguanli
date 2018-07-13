const Header = require("../conmon/Header.js");
function Index(){
    this.createDom();
}
$.extend(Index.prototype,{
   createDom:function(){
    new Header();
   }
});
module.exports=Index;

