var goalTodoSrv = function ($http, $q) {

 var GoalTodoSrv = function () {
  this.goalTodos = [];
 };
 GoalTodoSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
  if (!data || typeof data !== 'object') {
   this.error = 'Error';
  }
  if (!this.error && data.result && data.result.error) {
   this.error = data.result.error;
  }
  if (!this.error && data.error) {
   this.error = data.error.message;
  }
  if (!this.error && defaultMsg) {
   this.error = defaultMsg;
  }
  if (this.error) {
   return deferred.reject(data);
  }
  return deferred.resolve(data);
 };


 GoalTodoSrv.prototype.getGoalTodo = function (goalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId + '/todo/' + todoId).success(function (data) {
   self.goalTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GoalTodoSrv.prototype.editGoalTodo = function (goalTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/todo/edit',
   data: goalTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return GoalTodoSrv;
};
goalTodoSrv.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalTodoSrv', goalTodoSrv);
