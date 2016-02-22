var exploreTodosManager=function($http,$q){var ExploreTodosManager=function(){this.exploreTodos=[]};return ExploreTodosManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExploreTodosManager.prototype.getExploreTodos=function(exploreId,levelId){var self=this,deferred=$q.defer();return $http.get("/api/explore/"+exploreId+"/todos/"+levelId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodosManager.prototype.getExploreTodo=function(exploreId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/explore/"+exploreId+"/todo/"+todoId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodosManager.prototype.createExploreTodo=function(exploreTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/todo/create",data:exploreTodoData}).success(function(data){self.exploreTodos.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodosManager.prototype.editExploreTodo=function(exploreTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/todo/edit",data:exploreTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTodosManager};exploreTodosManager.$inject=["$http","$q"],angular.module("app.explore").service("ExploreTodosManager",exploreTodosManager);