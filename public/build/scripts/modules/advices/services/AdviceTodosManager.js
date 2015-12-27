var adviceTodosManager=function($http,$q){var AdviceTodosManager=function(){this.adviceTodos=[]};return AdviceTodosManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},AdviceTodosManager.prototype.getAdviceTodos=function(adviceId){var self=this,deferred=$q.defer();return self.adviceTodos=[],$http.get("/api/advice/"+adviceId+"/todos").success(function(data){self.adviceTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTodosManager.prototype.getAdviceTodo=function(adviceId,todoId){var self=this,deferred=$q.defer();return self.adviceTodos=[],$http.get("/api/advice/"+adviceId+"/todo/"+todoId).success(function(data){self.adviceTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTodosManager.prototype.createAdviceTodo=function(adviceTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/todo/create",data:adviceTodoData}).success(function(data){self.adviceTodos.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTodosManager.prototype.editAdviceTodo=function(adviceTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/todo/edit",data:adviceTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTodosManager};adviceTodosManager.$inject=["$http","$q"],angular.module("app.advices").service("AdviceTodosManager",adviceTodosManager);