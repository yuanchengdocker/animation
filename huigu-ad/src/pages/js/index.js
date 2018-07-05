var huiguAd = {
    pages:14,
    currentPage:1,
    hasLoadPages:0,
    voiceDown:false,
    imgBase:"../img/",
    imgUrl:huiguAdInit.imgUrl,
    imgDatas:{},
    imgScenes:huiguAdInit.imgScenes,
    loadPage:function(index,callback){
        var self = this;
        self.imgDatas["page"+index] = {};
        if(index){
            var urls = this.imgUrl["page"+index];
            var count = 0;
            urls.map(function(item,index2){
                var img = new myImage(item.containerId,self.imgBase+item.url);
                img.load(function(img,id){
                    count++;
                    self.imgDatas["page"+index][id] = img;
                    if(urls.length == count){
                        self.hasLoadPages++;
                        callback&&callback(index);
                    }
                });
            })
        }
    },
    loadScene:function(index,callback){
        var self = huiguAd;
        var imgDatas = self.imgDatas["page"+index];
        if(index){
            var scenes = self.imgScenes["page"+index];
            if(!scenes||scenes.length<=0) return;
            scenes[0].map(function(item){
                var id = "page"+index+"-"+item;
                self.appendImg(id,imgDatas[id]);
            })
            if(scenes&&scenes.length>1){
                var count = 0;
                scenes.slice(1,scenes.length).map(function(item,it){
                    var addImgs = item.add;
                    var removeImgs = item.remove;
                    var time = item.time||0;
                    var addClass = item.addClass;
                    var removeClass = item.removeClass;
                    setTimeout(function(){
                        removeImgs&&removeImgs.map(function(item){
                            var id = "page"+index+"-"+item;
                            self.removeImg(id,imgDatas[id]);
                        })
                        addImgs&&addImgs.map(function(item){
                            var id = "page"+index+"-"+item;
                            self.appendImg(id,imgDatas[id]);
                        })
                        addClass&&addClass.map(function(mm){
                            var id = "page"+index+"-"+mm.id;
                            self.imgAddClass(id,mm.class);
                        })
                        removeClass&&removeClass.map(function(mm){
                            var id = "page"+index+"-"+mm.id;
                            self.removeClass(id,mm.class);
                        })
                        count++;
                        if(count == (scenes.length-1)){
                            callback&&callback();
                        }
                    },time)
                })
            }
        }
    },
    appendImg(id,img){
        document.getElementsByClassName(id)[0].appendChild(img);
    },
    removeImg(id,img){
        document.getElementsByClassName(id)[0].removeChild(img);
    },
    imgAddClass(id,cls){
        var elem = document.getElementsByClassName(id)[0];
        if (!this.hasClass(id, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    },
    hasClass(id,cls){
        var elem = document.getElementsByClassName(id)[0];
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },
    removeClass(id,cls){
        if (this.hasClass(id, cls)) {
            var elem = document.getElementsByClassName(id)[0];
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    showPage(index){
        for(var i=1;i<=this.pages;i++){
            if(i == index){
                document.getElementsByClassName("page"+i)[0].style.display = ""
            }else{
                document.getElementsByClassName("page"+i)[0].style.display = "none"
            }
        }
    },
    changePage(){
        huiguAd.currentPage++;
        huiguAd.showPage(huiguAd.currentPage);
        huiguAd.loadScene(huiguAd.currentPage,function(){
            if(huiguAd.currentPage != huiguAd.pages)
                huiguAd.changePage();
        });
    }
}
function moveToNext(){
    huiguAd.appendImg("page14-qrcode",huiguAd.imgDatas["page14"]["page14-qrcode"]);
    huiguAd.removeImg("page14-arrow",huiguAd.imgDatas["page14"]["page14-arrow"]);
    huiguAd.imgAddClass("page14-introduce","page14-introduce-out");
    huiguAd.imgAddClass("page14-qrcode","page14-qrcode-in");
}
window.onload=function(){
    // huiguAd.showPage(14);
    // huiguAd.loadPage(14,huiguAd.loadScene);
    // return;
    var initStartImg = new Image();
    initStartImg.src = "../img/00/initstart.png";
    huiguAd.appendImg("page1-start",initStartImg);
    
    var carAudio = new Audio();
    carAudio.src = "../pages/car.mp3";
    carAudio.load();
    carAudio.play();

    var audio = new Audio();
    audio.src = "../pages/voice3.mp3";
    audio.load();
    audio.play();
    audio.addEventListener("canplaythrough", function(){
        audio.pause();
        huiguAd.voiceDown = true;
        if(huiguAd.pages == huiguAd.hasLoadPages && huiguAd.voiceDown){
            if(initStartImg){
                huiguAd.removeImg("page1-start",initStartImg);
            }
            huiguAd.appendImg("page1-start",huiguAd.imgDatas["page1"]["page1-start"]);
            huiguAd.imgAddClass("page1-start","page1-start-float");
        }
    }, false);
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);

    for(var i=1;i<=huiguAd.pages;i++){
        if(i == 1){
            huiguAd.loadPage(i,function(){
                huiguAd.loadScene(huiguAd.currentPage);
            })
        }else{
            huiguAd.loadPage(i,function(){
                if(huiguAd.pages == huiguAd.hasLoadPages && huiguAd.voiceDown){
                    if(initStartImg){
                        huiguAd.removeImg("page1-start",initStartImg);
                    }
                    huiguAd.appendImg("page1-start",huiguAd.imgDatas["page1"]["page1-start"]);
                    huiguAd.imgAddClass("page1-start","page1-start-float");
                }
            })
        }
    }
    huiguAd.showPage(huiguAd.currentPage);

    document.getElementsByClassName("page1-start")[0].addEventListener("click",function(){
        audio&&audio.play();
        carAudio&&carAudio.pause();
        huiguAd.changePage();
    })
}