var goalTimelinesManager = function ($http, $q) {

 var GoalTimelinesManager = function () {
  this.goalTimelines = [];
 };
 GoalTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalTimelinesManager.prototype.getGoalTimelines = function (goalId) {
  var self = this;
  var deferred = $q.defer();
  self.goalTimelines = [];
  $http.get('/api/goal/' + goalId + '/timelines').success(function (data) {
   self.goalTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTimelinesManager.prototype.getGoalTimeline = function (goalId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.goalTimelines = [];
  $http.get('/api/goal/' + goalId + '/timeline/' + timelineId).success(function (data) {
   self.goalTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTimelinesManager.prototype.createGoalTimeline = function (goalTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/timeline/create',
   data: goalTimelineData
  }).success(function (data) {
   self.goalTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalTimelinesManager.prototype.editGoalTimeline = function (goalTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/timeline/edit',
   data: goalTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GoalTimelinesManager;
};

goalTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.goals').service('GoalTimelinesManager', goalTimelinesManager);
