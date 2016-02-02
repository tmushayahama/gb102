var goalWeblinkManager = function ($http, $q) {

 var GoalWeblinkManager = function () {
  this.goalWeblinks = [];
 };
 GoalWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GoalWeblinkManager.prototype.getGoalWeblink = function (goalId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId + '/weblink/' + weblinkId).success(function (data) {
   self.goalWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GoalWeblinkManager.prototype.editGoalWeblink = function (goalWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/weblink/edit',
   data: goalWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return GoalWeblinkManager;
};

goalWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalWeblinkManager', goalWeblinkManager);