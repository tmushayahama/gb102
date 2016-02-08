var goalTodosManager=function($http,$q){var GoalTodosManager=function(){this.goalTodos=[]};return GoalTodosManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalTodosManager.prototype.getGoalTodos=function(goalId){var self=this,deferred=$q.defer();return self.goalTodos=[],$http.get("/api/goal/"+goalId+"/todos").success(function(data){self.goalTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTodosManager.prototype.getGoalTodo=function(goalId,todoId){var self=this,deferred=$q.defer();return self.goalTodos=[],$http.get("/api/goal/"+goalId+"/todo/"+todoId).success(function(data){self.goalTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTodosManager.prototype.createGoalTodo=function(goalTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/todo/create",data:goalTodoData}).success(function(data){self.goalTodos.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTodosManager.prototype.editGoalTodo=function(goalTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/todo/edit",data:goalTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTodosManager};goalTodosManager.$inject=["$http","$q"],angular.module("app.goal").service("GoalTodosManager",goalTodosManager);