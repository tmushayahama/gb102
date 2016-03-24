var projectTodoSrv=function($http,$q){var ProjectTodoSrv=function(){this.projectTodos=[]};return ProjectTodoSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProjectTodoSrv.prototype.getProjectTodo=function(projectId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/project/"+projectId+"/todo/"+todoId).success(function(data){self.projectTodo=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectTodoSrv.prototype.editProjectTodo=function(projectTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/todo/edit",data:projectTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectTodoSrv};projectTodoSrv.$inject=["$http","$q"],angular.module("app.project").service("ProjectTodoSrv",projectTodoSrv);