var goalTodosSrv = function ($http, $q) {

 var GoalTodosSrv = function () {
  this.goalTodos = [];
 };
 GoalTodosSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalTodosSrv.prototype.getGoalTodos = function (goalId) {
  var self = this;
  var deferred = $q.defer();
  self.goalTodos = [];
  $http.get('/api/goal/' + goalId + '/todos').success(function (data) {
   self.goalTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTodosSrv.prototype.getGoalTodo = function (goalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.goalTodos = [];
  $http.get('/api/goal/' + goalId + '/todo/' + todoId).success(function (data) {
   self.goalTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTodosSrv.prototype.createGoalTodo = function (goalTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/todo/create',
   data: goalTodoData
  }).success(function (data) {
   self.goalTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTodosSrv.prototype.editGoalTodo = function (goalTodoData) {
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


 return GoalTodosSrv;
};

goalTodosSrv.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalTodosSrv', goalTodosSrv);