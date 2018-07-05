# 项目介绍
这个项目是医客App 3.5版本, 内嵌入的H5页面，主要包含以下模块
1. 评论和点赞通知页面
2. 资讯的详情文章页
3. 资讯详情的评论模块
4. 随堂测验功能，即考试模块
5. 课程详情的评论功能
------------------
需求文档地址：\\192.168.0.8\3.0产品\医客2014\医客3.5.0

## 接口调整


## Bridge 与APP的传输约定

window.callNativeApi('HKBridgeFun', 'hkJSCallToComment', CommentModel_2, function (result) {
      //回调参数是{"code": 0, "data": {
      "authorId": "599310323660361728",  //作者id
      "author","练家康"//作者名字
      "commentID",""  //单条评论ID

      }}回调的入参是这样的json，
      // code 为0处理成功，其他失败比如-1。data可以放业务需要的参数,没有业务参数可放空对象{"code": 0, "data": {}}
      //h5处理回调
      document.getElementById('log').innerHTML = JSON.stringify(result) + '，我是支付2';
  });


## H5分享的接口调用案例

var btn = $("#footer");

btn.onclick = function(){
  var shareDataJSON = JSON.stringify(shareModel);
  callAppWithShareData(shareDataJSON);
};


var hkapp_browser = {
  versions: function () {
    var u = navigator.userAgent.toLowerCase();
    return {//移动终端浏览器版本信息
      txt: u, // 浏览器版本信息
      version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
      ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
      android: u.indexOf('android') > -1, //android终端
      ios7: /iphone os 7_/.test(u), //是否为ios7
      jsBridge: /support_js_bridge/.test(u) //是否支持 JSBridge
    };
  }(),
}

/*
 * 唤起APP端定义的方法（与APP端相关）
 * 要求区分不同终端，并针对iOS做不同处理
 * HKJSBridge:APP端与H5之间的桥接
 * HKBridgeFun: android端定义的类名
 * hkJSCallToShareWithData: APP端定义的用于调取分享功能的方法名
 * shareDataJSON: 要求为JSON格式，否则APP端解析可能会出错
 */

function callAppWithShareData(shareDataJSON) {
  if (hkapp_browser.versions.ios) { //iOS终端
    if (hkapp_browser.versions.ios7) {//for iOS7 Only
      HKJSBridge.hkJSCallToShareWithData(shareDataJSON);
    }
    else {//for iOS8+
      window.webkit.messageHandlers.hkJSCallToShareWithData.postMessage(shareDataJSON);
    }
  }

  
  else if (hkapp_browser.versions.android) {//android终端
    HKJSBridge.call('HKBridgeFun','hkJSCallToShareWithData',{'msg':shareDataJSON},appShareSuccessCallBack);
  }
  else {
    //自己看着办...
  }
}