var goalTodoManager=function($http,$q){var GoalTodoManager=function(){this.goalTodos=[]};return GoalTodoManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalTodoManager.prototype.getGoalTodo=function(goalId,todoId){var self=this,deferred=$q.defer();return $http.get("/api/goal/"+goalId+"/todo/"+todoId).success(function(data){self.goalTodo=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTodoManager.prototype.editGoalTodo=function(goalTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/todo/edit",data:goalTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTodoManager};goalTodoManager.$inject=["$http","$q"],angular.module("app.goals").service("GoalTodoManager",goalTodoManager);