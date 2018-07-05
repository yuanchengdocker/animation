var comment_box = $(".comment-box .item");

//与APP交互
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
};
var lectureId = $.getUrlParam('lectureId'); //新闻id
 //此方法用于调用ios的api
function setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
//调起资讯评论
window.yykyapp_browser = {
    versions: function () {
        var u = navigator.userAgent.toLowerCase();
        return {//移动终端浏览器版本信息
            txt: u, // 浏览器版本信息
            version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
            ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
            android: u.indexOf('android') > -1, //android终端                       
            yyky: u.indexOf('szyyky_huigu_version_') > -1, //是否为医易康云App
        };
    }()
};
//ios和安卓api调用兼容性写法  H5将数据传输给APP，然后APP再将处理结果回传给H5
window.callNativeApi = function (YYKYBridgeFun, funName, data, callback) {
  if (yykyapp_browser.versions.ios) {
      var yykyUA = yykyapp_browser.versions;
      
          window.setupWebViewJavascriptBridge(function (bridge) {
              //入参
              bridge.callHandler('handlerForApp', data, function (response) {

              });
              //h5回调，和naive开发约定是否有回调，有则必传，无则一定不能传，否则安卓会报传参错误
              if(callback) {
                  bridge.registerHandler('callbackForWeb', callback);
              } else {
                  bridge.registerHandler('callbackForWeb');
              }
          })
      
  } else if (yykyapp_browser.versions.android) {
      //ios必须传action字段来区分api,安卓不需要，故删除掉
      delete data.action;
      if(callback) {
          YYKYJSBridge.call(YYKYBridgeFun, funName, {'msg': JSON.stringify(data)}, callback);
      } else {
          YYKYJSBridge.call(YYKYBridgeFun, funName, {'msg': JSON.stringify(data)});
      }
  }
};
if (yykyapp_browser.versions.ios) {
  window.setupWebViewJavascriptBridge(function(bridge) {
      bridge.registerHandler('handlerForWeb', function(data, responseCallback) {
          //log('ObjC called testJavascriptHandler with', data)
          var responseData = { '123': '评论成功' }
          appDataPostToWebHandler(data);
          responseCallback(responseData)
      })                                       
  })
}
//iOS和安卓处理数据的方法
function appDataPostToWebHandler(data) {
  //评论成功处理回调
  if(data.code == 0){
    var commentModel = data.data.commentId + "";

    var commentData = {topicId : commentModel};

    $.ajax({
      url: querySingle,
      type: 'post',
      datatype: 'json' ,
      contentType: 'application/json',
      data: JSON.stringify(commentData),
      success: function(data){
        if(data.code == 0){
          var detailData = data.data;  //数据赋值
          for(var i=0; i< detailData.length; i++){  //遍历数据
            detailData[i].createTime = getDateDiff(detailData[i].createTime); //转换long时间为date类型
            detailData[i].praiseNum = countData(detailData[i].praiseNum); //点赞数超过10000的显示10000+
            $(".empty").css("display","none");
          }

          comment_box.prepend(_.template($("#template-comment0").html()) (data));
        }
      },
      error: function(){
        setToast3("请求错误，请稍后重试");
      }
   })
  }
}