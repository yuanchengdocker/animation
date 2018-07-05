 //此方法用于调用ios的api
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
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
        })

    } else if (yykyapp_browser.versions.android) {
        //ios必须传action字段来区分api,安卓不需要，故删除掉
        delete data.action;
        if (callback) {
            YYKYJSBridge.call(YYKYBridgeFun, funName, { 'msg': JSON.stringify(data) }, callback);
        } else {

            YYKYJSBridge.call(YYKYBridgeFun, funName, { 'msg': JSON.stringify(data) });
        }
    }
};