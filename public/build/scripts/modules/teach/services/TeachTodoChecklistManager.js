var teachTodoChecklistManager=function($http,$q){var TeachTodoChecklistManager=function(){this.teachTodoChecklist=[]};return TeachTodoChecklistManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},TeachTodoChecklistManager.prototype.getTeachTodoChecklist=function(todoId){var self=this,deferred=$q.defer();return self.teachTodoChecklist=[],$http.get("/api/todo/"+todoId+"/checklist").success(function(data){self.teachTodoChecklist=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachTodoChecklistManager.prototype.getTeachTodoChecklistItem=function(teachId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/teach/"+teachId+"/todo/"+todoId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachTodoChecklistManager.prototype.createTeachTodoChecklistItem=function(teachTodoChecklistData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/checklist/create",data:teachTodoChecklistData}).success(function(data){self.teachTodoChecklist.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachTodoChecklistManager.prototype.editTeachTodoChecklistItem=function(teachTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/todo/checklist/edit",data:teachTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachTodoChecklistManager};teachTodoChecklistManager.$inject=["$http","$q"],angular.module("app.teach").service("TeachTodoChecklistManager",teachTodoChecklistManager);