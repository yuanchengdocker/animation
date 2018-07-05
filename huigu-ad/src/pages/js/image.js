var myImage = function(containerId,url){
    this.containerId = containerId;
    this.url = url;
}
myImage.prototype.load = function(callback){
    var self = this;
    if(this.url){
        var img = new Image();
        img.src = this.url;
        img.onload = function(){
            callback&&callback(this,self.containerId);
        }
    }else{
        return;
    }
}