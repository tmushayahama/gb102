var goalProgressManager = function ($http, $q) {

 var GoalProgressManager = function () {
  this.goalProgress = [];
 };
 GoalProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GoalProgressManager.prototype.getGoalProgress = function (goalId, progressId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId + '/progress/' + progressId).success(function (data) {
   self.goalProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GoalProgressManager.prototype.editGoalProgress = function (goalProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/progress/edit',
   data: goalProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return GoalProgressManager;
};

goalProgressManager.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalProgressManager', goalProgressManager);