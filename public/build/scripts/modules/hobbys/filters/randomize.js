angular.module("app.hobbys").filter("randomize",function(){return function(input,scope){return null!=input&&void 0!=input&&input>1?Math.floor(Math.random()*input+1):void 0}});