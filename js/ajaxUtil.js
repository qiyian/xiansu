/**
 * Created by Administrator on 2016/8/26.
 */
var ajaxUtil= {


    getajaxXhr: function () {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    },


    getajaxRequest: function (method, url, bool, fn,fnerror) {
        var xhr = this.getajaxXhr();
        if (bool) {
            xhr.open(method, url, bool);
            xhr.onreadystatechange = function () {
                if(xhr.readyState ==4){
                    if(xhr.status ==200){
                        if(fn){
                            fn(xhr);
                        }
                    }else {
                        if(fnerror){
                            fnerror();
                        }
                    }
                }
            };
            xhr.send();
        }
        else {
            xhr.open(method, url, bool);
            xhr.send();
            if (xhr.status == 200) {
                if (fn) {
                    fn(xhr);
                }
            }

        }
    }
};