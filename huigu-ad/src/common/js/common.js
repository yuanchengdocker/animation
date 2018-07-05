//公用组件库

//阅读数超过10000显示10000+
function readData(num){
  if(num > 100000){
    str = "100000+";
    return str;
  }
  else{
    return num;
  }
};

//点赞数超过10000显示10000+
function countData(num){
  if(num > 10000){
    str = "10000+";
    return str;
  }
  else{
    return num;
  }
};

  //转换时间long类型  放置资讯
function formatDateTime(time,type) {  
  var date = new Date(time);
  if(time == undefined || null == time || "" == time){
    return "";
  }
  var y = date.getFullYear();  
  var m = date.getMonth() + 1;  
  m = m < 10 ? ('0' + m) : m;  
  var d = date.getDate();  
  d = d < 10 ? ('0' + d) : d;  
  var h = date.getHours();  
  h = h < 10 ? ('0' + h) : h; 
  var minute = date.getMinutes();  
  minute = minute < 10 ? ('0' + minute) : minute; 
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  if(type=="hour") {
      return y+'-'+m+'-'+d+" "+h
  }
  if(type=="minute") {
      return y+'-'+m+'-'+d+" "+h+":"+minute
  }
  if(type=="second") {
      return y+'-'+m+'-'+d+" "+h+":"+minute+":"+second
  }
  return y + '-' + m + '-' + d;  
};

//转换时间long类型  放置评论
function getDateDiff(dateTimeStamp){
  var result;
  var minute1 = 1000 * 60;
  var hour = minute1 * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = month * 12;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;

   var date = new Date(dateTimeStamp);  //当前数据时间
   var y = date.getFullYear();  
   var m = date.getMonth() + 1;  
   m = m < 10 ? ('0' + m) : m;  
   var d = date.getDate();  
   d = d < 10 ? ('0' + d) : d;  
   var h = date.getHours();  
   h = h < 10 ? ('0' + h) : h; 
   var minute = date.getMinutes();  
   minute = minute < 10 ? ('0' + minute) : minute;  

  if(diffValue < 0){
    return;
  }
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute1;
  if(diffValue > year){
    return result= y + "-" + m + "-" + d + " " + h + ":" + minute;
  }
  else if(diffValue > month){
    return result= m + "-" + d + " " + h + ":" + minute;
  }
  else if(diffValue >= 3*day){
    return result= m + "-" + d + " " + h + ":" + minute;
  }
  else if(diffValue >= 2*day){
    return result= "前天" + " " + h + ":" + minute;
  }
  else if(diffValue >= day){
    return result="昨天" + " " + h + ":" + minute;
  }
  else if(diffValue > hour){
    return result=""+ parseInt(hourC) +"小时前";
  }
  else if(diffValue > minute1){
    return result=""+ parseInt(minC) +"分钟前";
  }
  return result="刚刚";
};

//加载更多
function pullUp(container){
  // dom结构
  var pullUpStr = '<div class="pullUp" id="pullUp">加载更多</div>';
  // 插入页面
  // $(".c-item").append(pullUpStr);
  // $(".list").append(pullUpStr);

  container.append(pullUpStr);
}
// pullUp();

//设置cookie
function setCookie (name, value) {
  var dt = new Date();
  dt.setHours(dt.getHours() + 12);
  document.cookie = name + "=" + value + 
  "; expires=" + dt.toGMTString() + "; path=/"; 
}
setCookie("token",getCookie("token"));
setCookie("apiVer",getCookie("apiVer"));
setCookie("cType",getCookie("cType"));
setCookie("appVer",getCookie("appVer"));
setCookie("appType",getCookie("appType"));
setCookie("PhoneOS",getCookie("PhoneOS"));
setCookie("osVer",getCookie("osVer"));
setCookie("osUUID",getCookie("osUUID"));
setCookie("appSrc",getCookie("appSrc"));
setCookie("IDFA",getCookie("IDFA"));
setCookie("userRole",getCookie("userRole"));

//获取手机端存储的cookie信息
function getCookie(name) {
  var search;
  search = name + "=" ;
  offset = document.cookie.indexOf(search) ;
  if (offset != -1) { 
  offset += search.length ; 
  end = document.cookie.indexOf(";", offset) ; 
  if (end == -1) 
  end = document.cookie.length; 
  return unescape(document.cookie.substring(offset, end)); 
  } 
  else 
  return ""; 
}

//字符多出显示...
function cutstr(str, len) {
  var str_length = 0;
  var str_len = 0;
  str_cut = new String();
  str_len = str.length;
  for (var i = 0; i < str_len; i++) {
      a = str.charAt(i);
      str_length++;
      if (escape(a).length > 4) {
          //中文字符的长度经编码之后大于4  
          str_length++;
      }
      str_cut = str_cut.concat(a);
      if (str_length >= len) {
          str_cut = str_cut.concat("...");
          return str_cut;
      }
  }
  //如果给定字符串小于指定长度，则返回源字符串；  
  if (str_length < len) {
      return str;
  }
}

var GetLength = function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};


//toast提示
(function(){
    var toastTime2 = null;
    var displayTime2 = null;

    function $S(s){
      return document.getElementById(s);
    }
    function $html(s,html){
      $S(s).innerHTML=html;
    }
     var setToast3=function(result){
      if(toastTime2!=null){
        clearTimeout(toastTime2);
        clearTimeout(displayTime2);
      }
      $S('toastId2').style.display='block';
      $S('toastId2').style.opacity=1;
      $html('toastId2',('<div style="color:#fff;background: rgba(0, 0, 0, 0.6);border-radius: 2px;padding: 2px;text-align: center;width:175px;margin: 0 auto;">'+ result +'</div>'));
      toastTime2=setTimeout(function(){
        $S('toastId2').style.opacity=0;
        displayTime2=setTimeout(function(){
          $S('toastId2').style.display='none';
        },1000);
      },1000);
    }
    window.setToast3 = setToast3;
})();

//ajax请求函数 callback：回调函数；url：请求地址；params:请求参数对象；
function huiguPost(callback,url,params,obj){
  $.ajax({
    url: url,
    type: 'post',
    datatype: 'json',
    contentType: 'application/json',
    data:JSON.stringify(params),
    success: function(data){
      callback&&callback(data);
    },
    error: function(){
      setToast3("提交失败");
      if(obj){
        obj.attr("disabled",false);
      }
    }
  });
}
function optUrlParams(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var target = window.location.hash||window.location.search;
    if(!target) return null;
    var r = target.split("?")[1].match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}

//下拉刷新
//u_list放置数据的容器; tem_id：lodash的模板ID字符串; serviceUrl:请求服务的URL地址; pageSize:分页数
function scrollFresh(u_list,tem_id,serviceUrl,pageSize){
    var currentPage = 1;
    var ajaxLock = false;
    $("html").height("auto")
    var getData=function(){
      huiguPost(function(data){
        ajaxLock = false;
        if(data.code == 0){
            var detailData = data.data;
            $("#pullUp").css("display","block");
            if(detailData.length < pageSize || detailData.length == 0){
              $("#pullUp").css("display","none");
              ajaxLock = true;
            }
            if(detailData.length == 0){
              if(currentPage == 1){
                u_list.css("background-color","#ffffff");
                u_list.html('<img src="/build2/img/empty.png" style="margin:0 auto;display:block; width: 20%;margin-top: 25%;margin-left: 40%"/><p style="color:#919dae;font-size:.346667rem;margin: .666667rem auto;width:100%;text-align: center;margin-bottom: 25px">暂无内容</p>');
              }
              return
            }
        }else{
            ajaxLock = true;
            $("#pullUp").css("display","none");
            return;
        }
        var ele =  _.template($("#"+tem_id).html()) (data);
        u_list.append(ele);
        if(currentPage==1&&u_list.height() < window.screen.height){
            $("html").height("100%")
            $("body").height("100%")
        }
      },serviceUrl,{currentPage:currentPage,pageSize:pageSize});
    }
    getData();
     
    window.addEventListener('scroll', function (e) {
      var wScrollY = window.pageYOffset|| document.documentElement.scrollTop    
                || document.body.scrollTop    
                || 0;
        var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
        var bScrollH = document.body.scrollHeight; // 滚动条总高度
        if (wScrollY + wInnerH >= bScrollH - 100) {
             if (!ajaxLock) {
              currentPage = currentPage + 1;
              getData();  
              ajaxLock = true;
            }
        }
  });
}


//判断是否是体验账号
//result：到达的链接地址
function accountNumber(result){
  if(getCookie("token")){
    window.location.href= result;
    return;
  }else{
    //提示用户登录
    var dataModel = {
        "action": "yyky_remindtologin",
        "needLogin": true,       //是否需要用户登录
        "needRegistered": true,  //是否需要用户注册账号

    };

    window.callNativeApi('YYKYBridgeFun', 'yykyJSCallToRemindToLogin', dataModel, function (result) { });
  }
}


//点击放大
//获取可浏览大图的图片数据
function getImgUrls(box,type) {
    var objs;
    if(type == 1){
     objs = $(box).children("ul").children(".apply-item").children(".upload-img");
    }else{
     objs = $(box).find("img");
    }
    // var objs = $(box).find("img");

    var imgUrlsArr = new Array();

    for (var i = 0; i < objs.length; i++) {

        var clientTop = objs[i].getBoundingClientRect().top;
        var clientWidth = objs[i].clientWidth;
        var clientHeight = objs[i].clientHeight;
        var src = objs[i].src;
        var imgUrl = src + "&img_top=" + clientTop + "&img_width=" + clientWidth + "&img_height=" + clientHeight;

        imgUrlsArr[i] = imgUrl;


        objs[i].onclick = function () {

            var thisTop = this.getBoundingClientRect().top;
            var thisWidth = this.clientWidth;
            var thisHeight = this.clientHeight;
            var thisSrc = this.src;

            var thisUrl = thisSrc + "&img_top=" + thisTop + "&img_width=" + thisWidth + "&img_height=" + thisHeight;

            var imgsModel = {
                "action": "yyky_browsephoto",
                "imgUrls": imgUrlsArr,
                "currImgUrl": thisUrl
            };

            window.callNativeApi('YYKYBridgeFun', 'yykyJSCallToBrowsePhoto', imgsModel, function (result) { });
        }
    };

};


