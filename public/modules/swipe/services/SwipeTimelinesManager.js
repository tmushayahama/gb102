var swipeTimelinesManager = function ($http, $q) {

 var SwipeTimelinesManager = function () {
  this.swipeTimelines = [];
 };
 SwipeTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeTimelinesManager.prototype.getSwipeTimelines = function (swipeId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeTimelines = [];
  $http.get('/api/swipe/' + swipeId + '/timelines').success(function (data) {
   self.swipeTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTimelinesManager.prototype.getSwipeTimeline = function (swipeId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeTimelines = [];
  $http.get('/api/swipe/' + swipeId + '/timeline/' + timelineId).success(function (data) {
   self.swipeTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTimelinesManager.prototype.createSwipeTimeline = function (swipeTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/timeline/create',
   data: swipeTimelineData
  }).success(function (data) {
   self.swipeTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTimelinesManager.prototype.editSwipeTimeline = function (swipeTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/timeline/edit',
   data: swipeTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SwipeTimelinesManager;
};

swipeTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeTimelinesManager', swipeTimelinesManager);
