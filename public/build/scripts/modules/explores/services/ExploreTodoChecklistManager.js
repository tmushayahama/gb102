var exploreTodoChecklistManager=function($http,$q){var ExploreTodoChecklistManager=function(){this.exploreTodoChecklist=[]};return ExploreTodoChecklistManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExploreTodoChecklistManager.prototype.getExploreTodoChecklist=function(todoId){var self=this,deferred=$q.defer();return self.exploreTodoChecklist=[],$http.get("/api/todo/"+todoId+"/checklist").success(function(data){self.exploreTodoChecklist=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodoChecklistManager.prototype.getExploreTodoChecklistItem=function(exploreId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/explore/"+exploreId+"/todo/"+todoId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodoChecklistManager.prototype.createExploreTodoChecklistItem=function(exploreTodoChecklistData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/checklist/create",data:exploreTodoChecklistData}).success(function(data){self.exploreTodoChecklist.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodoChecklistManager.prototype.editExploreTodoChecklistItem=function(exploreTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/checklist/edit",data:exploreTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodoChecklistManager};exploreTodoChecklistManager.$inject=["$http","$q"],angular.module("app.explore").service("ExploreTodoChecklistManager",exploreTodoChecklistManager);