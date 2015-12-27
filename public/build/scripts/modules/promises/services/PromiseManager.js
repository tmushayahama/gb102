angular.module("app.promises").service("PromiseManager",["$http","$q",function(a,b){var c=function(){this.promise=[]};return c.prototype.deferredHandler=function(a,b,c){return a&&"object"==typeof a||(this.error="Error"),!this.error&&a.result&&a.result.error&&(this.error=a.result.error),!this.error&&a.error&&(this.error=a.error.message),!this.error&&c&&(this.error=c),this.error?b.reject(a):b.resolve(a)},c.prototype.getPromise=function(c){var d=this,e=b.defer();return a.get("/api/promise/"+c).success(function(a){d.promise=a,d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c.prototype.editPromise=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/promise/edit",data:c}).success(function(a){d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c}]);