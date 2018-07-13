const List = require("./list.js");
const Header = require("../conmon/Header.js");
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
