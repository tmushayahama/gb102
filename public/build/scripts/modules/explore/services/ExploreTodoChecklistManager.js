var explorerTodoChecklistManager=function($http,$q){var ExplorerTodoChecklistManager=function(){this.explorerTodoChecklist=[]};return ExplorerTodoChecklistManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorerTodoChecklistManager.prototype.getExplorerTodoChecklist=function(todoId){var self=this,deferred=$q.defer();return self.explorerTodoChecklist=[],$http.get("/api/todo/"+todoId+"/checklist").success(function(data){self.explorerTodoChecklist=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoChecklistManager.prototype.getExplorerTodoChecklistItem=function(explorerId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/explorer/"+explorerId+"/todo/"+todoId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoChecklistManager.prototype.createExplorerTodoChecklistItem=function(explorerTodoChecklistData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/checklist/create",data:explorerTodoChecklistData}).success(function(data){self.explorerTodoChecklist.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoChecklistManager.prototype.editExplorerTodoChecklistItem=function(explorerTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/checklist/edit",data:explorerTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerTodoChecklistManager};explorerTodoChecklistManager.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorerTodoChecklistManager",explorerTodoChecklistManager);