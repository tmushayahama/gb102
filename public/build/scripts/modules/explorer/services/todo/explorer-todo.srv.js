var explorerTodoSrv=function($http,$q){var ExplorerTodoSrv=function(){this.explorerTodos=[]};return ExplorerTodoSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorerTodoSrv.prototype.getExplorerTodo=function(explorerId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/explorer/"+explorerId+"/todo/"+todoId).success(function(data){self.explorerTodo=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoSrv.prototype.editExplorerTodo=function(explorerTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/todo/edit",data:explorerTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoSrv.prototype.editTodoStatus=function(todoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/editstatus",data:todoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoSrv.prototype.editChecklistStatus=function(checklistData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/checklist/editstatus",data:checklistData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoSrv};explorerTodoSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorerTodoSrv",explorerTodoSrv);