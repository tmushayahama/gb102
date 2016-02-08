var teachTodoManager=function($http,$q){var TeachTodoManager=function(){this.teachTodos=[]};return TeachTodoManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},TeachTodoManager.prototype.getTeachTodo=function(teachId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/teach/"+teachId+"/todo/"+todoId).success(function(data){self.teachTodo=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachTodoManager.prototype.editTeachTodo=function(teachTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/teach/todo/edit",data:teachTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachTodoManager};teachTodoManager.$inject=["$http","$q"],angular.module("app.teach").service("TeachTodoManager",teachTodoManager);