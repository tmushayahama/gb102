angular.module("app.advices").filter("randomize",function(){return function(a,b){return null!=a&&void 0!=a&&a>1?Math.floor(Math.random()*a+1):void 0}});