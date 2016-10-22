
var process_request = "正在处理您的请求...";
var username_empty = "用户名不能为空。";
var username_shorter = "用户名长度不能少于 3 个字符。";
var username_invalid = "用户名只能是由字母数字以及下划线组成。";
var password_empty = "登录密码不能为空。";
var password_shorter = "登录密码不能少于 6 个字符。";
var confirm_password_invalid = "两次输入密码不一致";
var email_empty = "Email 为空";
var email_invalid = "Email 不是合法的地址";
var agreement = "您没有接受协议";
var msn_invalid = "msn地址不是一个有效的邮件地址";
var qq_invalid = "QQ号码不是一个有效的号码";
var home_phone_invalid = "家庭电话不是一个有效号码";
var office_phone_invalid = "办公电话不是一个有效号码";
var mobile_phone_invalid = "手机号码不是一个有效号码";
var msg_un_blank = "用户名不能为空";
var msg_un_length = "用户名最长不得超过7个汉字";
var msg_un_format = "用户名含有非法字符";
var msg_un_registered = "用户名已经存在或不允许注册,请重新输入";
var msg_can_rg = "可以注册";
var msg_email_blank = "邮件地址不能为空";
var msg_email_registered = "邮箱已存在,请重新输入";
var msg_email_format = "邮件地址不合法";
var msg_blank = "不能为空";
var no_select_question = "您没有完成密码提示问题的操作";
var passwd_balnk = "- 密码中不能包含空格";
var username_exist = "用户名 %s 已经存在";



/*用户登录 start*/
function userLogin()
{
  var frm      = document.forms['formLogin'];
  var username = frm.elements['username'].value;
  var password = frm.elements['password'].value;
  var msg = '';

  if (username.length == 0)
  {
    msg += username_empty + '\n';
  }

  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function chkstr(str)
{
  for (var i = 0; i < str.length; i++)
  {
    if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
    {
      return false;
    }
  }
  return true;
}

function check_password( password )
{
    if ( password.length < 6 )
    {
		$("#password1").parent().removeClass("params_success");
		$("#password1").parent().addClass("params_error");
		
        document.getElementById('password_notice').innerHTML = password_shorter;
    }
    else
    {
		$("#password1").parent().removeClass("params_error");
		$("#password1").parent().addClass("params_success");

        document.getElementById('password_notice').innerHTML = "<em></em>"; //zhouhuan
    }
}

function check_conform_password( conform_password )
{
    password = document.getElementById('password1').value;
    
    if ( conform_password.length < 6 )
    {
		$("#conform_password").parent().removeClass("params_success");
		$("#conform_password").parent().addClass("params_error");
		
        document.getElementById('conform_password_notice').innerHTML = password_shorter;
        return false;
    }
    if ( conform_password != password )
    {
		$("#conform_password").parent().removeClass("params_success");
		$("#conform_password").parent().addClass("params_error");

        document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
    }
    else
    {
		$("#conform_password").parent().removeClass("params_error");
		$("#conform_password").parent().addClass("params_success");

        document.getElementById('conform_password_notice').innerHTML = "<em></em>"; //zhouhuan
    }
}

function is_registered( username )
{
    var submit_disabled = false;
	var unlen = username.replace(/[^\x00-\xff]/g, "**").length;

    if ( username == '' )
    {
        document.getElementById('username_notice').innerHTML = msg_un_blank;
        var submit_disabled = true;
    }

    if ( !chkstr( username ) )
    {
        document.getElementById('username_notice').innerHTML = msg_un_format;
        var submit_disabled = true;
    }
    if ( unlen < 3 )
    { 
        document.getElementById('username_notice').innerHTML = username_shorter;
        var submit_disabled = true;
    }
    if ( unlen > 14 )
    {
        document.getElementById('username_notice').innerHTML = msg_un_length;
        var submit_disabled = true;
    }
    if ( submit_disabled )
    {
        document.forms['formUser'].elements['Submit'].disabled = 'disabled';
        return false;
    }
    Ajax.call( 'http://www.xiansu.com/js/user.php?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', true, true );
}



function registed_callback(result)
{
  if ( result == "true" )
  {

	$("#username").parent().removeClass("params_error");
	$("#username").parent().addClass("params_success");

    document.getElementById('username_notice').innerHTML = "<em></em>"; //zhouhuan
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {

	$("#username").parent().removeClass("params_success");
	$("#username").parent().addClass("params_error");
    document.getElementById('username_notice').innerHTML = msg_un_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}

function checkEmail(email)
{
  var submit_disabled = false;
  
  if (email == '')
  {
    document.getElementById('email_notice').innerHTML = msg_email_blank;
    submit_disabled = true;
  }
  else if (!Utils.isEmail(email))
  {
    document.getElementById('email_notice').innerHTML = msg_email_format;
    submit_disabled = true;
  }
 
  if( submit_disabled )
  {
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
    return false;
  }
  Ajax.call( 'http://www.xiansu.com/js/user.php?act=check_email', 'email=' + email, check_email_callback , 'GET', 'TEXT', true, true );
}

function check_email_callback(result)
{
  if ( result == 'ok' )
  {
	$("#email").parent().removeClass("params_error");
	$("#email").parent().addClass("params_success");
	
    document.getElementById('email_notice').innerHTML = "<em></em>"; //zhouhuan
    document.forms['formUser'].elements['Submit'].disabled = '';
  }
  else
  {

	$("#email").parent().removeClass("params_success");
	$("#email").parent().addClass("params_error");

    document.getElementById('email_notice').innerHTML = msg_email_registered;
    document.forms['formUser'].elements['Submit'].disabled = 'disabled';
  }
}
/*用户登录 end*/



/*用户注册start*/
function register()
{
  var frm  = document.forms['formUser'];
  var username  = Utils.trim(frm.elements['username'].value);
  var email  = frm.elements['email'].value;
  var password  = Utils.trim(frm.elements['password'].value);
  var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
  var checked_agreement = frm.elements['agreement'].checked;
  var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
  var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
  var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
  var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
  var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
  var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
  var sel_question =  frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';


  var msg = "";
  // 检查输入
  var msg = '';
  if (username.length == 0){
  	msg += username_empty + '\n';
  }else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/)){
  	msg += username_invalid + '\n';
  }else if (username.length < 3){
    //msg += username_shorter + '\n';
  }

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_invalid + '\n';
    }
  }
  if (password.length == 0)
  {
    msg += password_empty + '\n';
  }
  else if (password.length < 6)
  {
    msg += password_shorter + '\n';
  }
  if (/ /.test(password) == true)
  {
	msg += passwd_balnk + '\n';
  }
  if (confirm_password != password )
  {
    msg += confirm_password_invalid + '\n';
  }
  if(checked_agreement != true)
  {
    msg += agreement + '\n';
  }

  if (msn.length > 0 && (!Utils.isEmail(msn)))
  {
    msg += msn_invalid + '\n';
  }

  if (qq.length > 0 && (!Utils.isNumber(qq)))
  {
    msg += qq_invalid + '\n';
  }

  if (office_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(office_phone))
    {
      msg += office_phone_invalid + '\n';
    }
  }
  if (home_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;

    if (!reg.test(home_phone))
    {
      msg += home_phone_invalid + '\n';
    }
  }
  if (mobile_phone.length>0)
  {
    var reg = /^[\d|\-|\s]+$/;
    if (!reg.test(mobile_phone))
    {
      msg += mobile_phone_invalid + '\n';
    }
  }
  if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0)
  {
    msg += no_select_question + '\n';
  }

  for (i = 4; i < frm.elements.length - 4; i++)	// 从第五项开始循环检查是否为必填项
  {
	needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

	if (needinput != '' && frm.elements[i].value.length == 0)
	{
	  msg += '- ' + needinput.innerHTML + msg_blank + '\n';
	}
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}


/*用户注册 end*/