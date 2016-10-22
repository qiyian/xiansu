/**
 * Created by Administrator on 2016/8/12.
 */
var cookieUtil={
    setCookie:function(name,value,days){
        var date=new Date();
        date.setDate(date.getDate()+days);
        document.cookie=name+"="+value+";expires="+date;
    },

    getCookie:function (name) {
        var cookieValue;
        var strCookie=document.cookie;
        var arrCookie=strCookie.split("; ");
        for(var i=0;i<arrCookie.length;i++){
            var item=arrCookie[i].split("=");
            if(item[0]==name){
                cookieValue=item[1];
            }
        }
        return cookieValue;
    },
    removeCookie:function (name) {
        setCookie(name," ",-1);
    }
}