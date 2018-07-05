!(function (window, doc) {
    var isWechat = (/MicroMessenger/ig).test(navigator.userAgent),
        isAndroid = !!navigator.userAgent.match(/android/ig),
        isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isIpad = !!navigator.userAgent.match(/ipad/ig),
        isIos9 = !!navigator.userAgent.match(/OS 9/ig),
        mobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/),
        webKit= navigator.userAgent.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        isYike = (/szyyky_huigu_version/ig).test(navigator.userAgent);

    if(!isYike){
        var openIframe = document.createElement('iframe');
        openIframe.style.display ='none';
        var timer = null;
        var openUrl = {
            schemaUrl:'yiyikangyunhuigu://bll/app.com?functype=1000',
            downloadUrl:'http://a.app.qq.com/o/simple.jsp?pkgname=com.huiguqx.huigu'
        };

        //下载条dom结构
        var downloadBarStr = '<div class="download-logo"></div>' +
            '<a href="javascript:void(0);" class="download-btn" id="downloadBtn">立即打开</a>';
        var downloadBarEle = document.createElement('div');
        downloadBarEle.className = 'download-bar';
        downloadBarEle.id = 'downloadBar';
        downloadBarEle.innerHTML = downloadBarStr;
        // 插入页面
        document.body.appendChild(downloadBarEle);

        //事件处理
        document.addEventListener('click', function (e) {
            var t = e.target.className;
            if(t.indexOf('download-btn') >= 0){
                var sTime = new Date().getTime();
                if(mobile){
                    if(isAndroid){
                        if(isWechat){
                            var _tDiv = document.createElement('div');
                            _tDiv.className ='g-tip g-tip-android';
                            document.body.appendChild(_tDiv);
                            _tDiv.onclick = function(e){
                                this.parentNode.removeChild(_tDiv);
                                return false;
                            }
                        }else if (/Chrome/i.test(navigator.userAgent) && isAndroid) {
                            var i = /Chrome\/(\d{2})/i.exec(navigator.userAgent);
                            if (i && parseInt(i[1]) < 35) {
                                location.href = openUrl.schemaUrl;
                            } else {
                                var j = window.open(openUrl.schemaUrl);
                                setTimeout(function () {
                                    j.close();
                                    var eTime = new Date().getTime();
                                    if (eTime - sTime < 800) {
                                        location.href = openUrl.downloadUrl;
                                    }
                                }, 500);
                            }
                        }else if (navigator.userAgent.match(/android/i)){
                            document.body.appendChild(openIframe);
                            openIframe.src = openUrl.schemaUrl;
                            timer = setTimeout(function () {
                                var eTime = new Date().getTime();
                                if (eTime - sTime < 800) {
                                    location.href = openUrl.downloadUrl;
                                }
                            }, 500);
                        }
                    }else if(isIos){
                        if(isWechat){
                            var _iDiv = document.createElement('div');
                            _iDiv.className ='g-tip g-tip-ios';
                            document.body.appendChild(_iDiv);
                            _iDiv.onclick = function(e){
                                this.parentNode.removeChild(_iDiv);
                                return false;
                            }
                        }else if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                            window.setTimeout(function() {
                                var timeOutDateTime = new Date();
                                if (timeOutDateTime - sTime < 5000) {
                                    window.location = openUrl.downloadUrl;
                                } else {
                                    window.close();
                                }
                            },2000);
                            window.location = openUrl.schemaUrl;
                        }else{
                            window.setTimeout(function() {
                                var timeOutDateTime = new Date();
                                if (timeOutDateTime - sTime < 5000) {
                                    window.location = openUrl.downloadUrl;
                                } else {
                                    window.close();
                                }
                            },2000);
                            window.location = openUrl.schemaUrl;
                        }
                    }else{
                       location.href = openUrl.downloadUrl; 
                    }
                }else{
                    location.href = openUrl.downloadUrl;
                }
            }
        },false);

        window.addEventListener('webkitvisibilitychange',function(e){
            var tag =  document.hidden || document.webkitHidden;
            if(tag){
                clearTimeout(timer);
            }
        },false);

        window.addEventListener('pagehide',function(e){
            clearTimeout(timer);
        });
    }else{
        $("#downloadBar").hide();
    }
})(window, document);