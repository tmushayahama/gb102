var collaborationTodosManager=function($http,$q){var CollaborationTodosManager=function(){this.collaborationTodos=[]};return CollaborationTodosManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationTodosManager.prototype.getCollaborationTodos=function(collaborationId){var self=this,deferred=$q.defer();return self.collaborationTodos=[],$http.get("/api/collaboration/"+collaborationId+"/todos").success(function(data){self.collaborationTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTodosManager.prototype.getCollaborationTodo=function(collaborationId,todoId){var self=this,deferred=$q.defer();return self.collaborationTodos=[],$http.get("/api/collaboration/"+collaborationId+"/todo/"+todoId).success(function(data){self.collaborationTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTodosManager.prototype.createCollaborationTodo=function(collaborationTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/todo/create",data:collaborationTodoData}).success(function(data){self.collaborationTodos.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTodosManager.prototype.editCollaborationTodo=function(collaborationTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/todo/edit",data:collaborationTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTodosManager};collaborationTodosManager.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationTodosManager",collaborationTodosManager);