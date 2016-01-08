var exploreTimelinesManager = function ($http, $q) {

 var ExploreTimelinesManager = function () {
  this.exploreTimelines = [];
 };
 ExploreTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreTimelinesManager.prototype.getExploreTimelines = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreTimelines = [];
  $http.get('/api/explore/' + exploreId + '/timelines').success(function (data) {
   self.exploreTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTimelinesManager.prototype.getExploreTimeline = function (exploreId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreTimelines = [];
  $http.get('/api/explore/' + exploreId + '/timeline/' + timelineId).success(function (data) {
   self.exploreTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTimelinesManager.prototype.createExploreTimeline = function (exploreTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/timeline/create',
   data: exploreTimelineData
  }).success(function (data) {
   self.exploreTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTimelinesManager.prototype.editExploreTimeline = function (exploreTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/timeline/edit',
   data: exploreTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreTimelinesManager;
};

exploreTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreTimelinesManager', exploreTimelinesManager);
