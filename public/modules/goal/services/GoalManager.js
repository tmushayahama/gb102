var goalSrv = function ($http, $q) {

 var GoalSrv = function () {
  this.goal = [];
 };
 GoalSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalSrv.prototype.getGoal = function (goalId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId).success(function (data) {
   //self.goal = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalSrv.prototype.getSubGoals = function (parentexplorerId) {
  var self = this;
  var deferred = $q.defer();
  //self.goals = [];
  $http.get('/api/goals/subgoals/' + parentexplorerId).success(function (data) {
   //self.goals = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalSrv.prototype.editGoal = function (goalData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/edit',
   data: goalData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return GoalSrv;
};

goalSrv.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalSrv', goalSrv);
