angular.module("app.hobbys").service("HobbyTodoManager",["$http","$q",function(a,b){var c=function(){this.hobbyTodos=[]};return c.prototype.deferredHandler=function(a,b,c){return a&&"object"==typeof a||(this.error="Error"),!this.error&&a.result&&a.result.error&&(this.error=a.result.error),!this.error&&a.error&&(this.error=a.error.message),!this.error&&c&&(this.error=c),this.error?b.reject(a):b.resolve(a)},c.prototype.getHobbyTodo=function(c,d){var e=this,f=b.defer();return a.get("/api/hobby/"+c+"/todo/"+d).success(function(a){e.hobbyTodo=a,e.deferredHandler(a,f)}).error(function(a){e.deferredHandler(a,f,"Unknown error")}),f.promise},c.prototype.editHobbyTodo=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/hobby/todo/edit",data:c}).success(function(a){d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c}]);