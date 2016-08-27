var collaborationTodosSrv=function($http,$q){var CollaborationTodosSrv=function(){this.collaborationTodos=[]};return CollaborationTodosSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationTodosSrv.prototype.getCollaborationTodo=function(collaborationId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/collaboration/"+collaborationId+"/todo/"+todoId).success(function(data){self.collaborationTodo=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTodosSrv.prototype.editCollaborationTodo=function(collaborationTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/todo/edit",data:collaborationTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTodosSrv};collaborationTodosSrv.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationTodosSrv",collaborationTodosSrv);