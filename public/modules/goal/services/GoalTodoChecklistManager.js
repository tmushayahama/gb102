var goalTodoChecklistSrv = function ($http, $q) {

 var GoalTodoChecklistSrv = function () {
  this.goalTodoChecklist = [];
 };
 GoalTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalTodoChecklistSrv.prototype.getGoalTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.goalTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.goalTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTodoChecklistSrv.prototype.getGoalTodoChecklistItem = function (goalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTodoChecklistSrv.prototype.createGoalTodoChecklistItem = function (goalTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: goalTodoChecklistData
  }).success(function (data) {
   self.goalTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTodoChecklistSrv.prototype.editGoalTodoChecklistItem = function (goalTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: goalTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GoalTodoChecklistSrv;
};

goalTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalTodoChecklistSrv', goalTodoChecklistSrv);