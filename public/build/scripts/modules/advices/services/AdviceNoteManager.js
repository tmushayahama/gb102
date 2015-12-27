angular.module("app.advices").service("AdviceNoteManager",["$http","$q",function(a,b){var c=function(){this.adviceNotes=[]};return c.prototype.deferredHandler=function(a,b,c){return a&&"object"==typeof a||(this.error="Error"),!this.error&&a.result&&a.result.error&&(this.error=a.result.error),!this.error&&a.error&&(this.error=a.error.message),!this.error&&c&&(this.error=c),this.error?b.reject(a):b.resolve(a)},c.prototype.getAdviceNote=function(c,d){var e=this,f=b.defer();return a.get("/api/advice/"+c+"/note/"+d).success(function(a){e.adviceNote=a,e.deferredHandler(a,f)}).error(function(a){e.deferredHandler(a,f,"Unknown error")}),f.promise},c.prototype.editAdviceNote=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/advice/note/edit",data:c}).success(function(a){d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c}]);