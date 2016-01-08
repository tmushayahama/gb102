var swipeTimelineManager = function ($http, $q) {

 var SwipeTimelineManager = function () {
  this.swipeTimelines = [];
 };
 SwipeTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SwipeTimelineManager.prototype.getSwipeTimeline = function (swipeId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/swipe/' + swipeId + '/timeline/' + timelineId).success(function (data) {
   self.swipeTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SwipeTimelineManager.prototype.editSwipeTimeline = function (swipeTimelineData) {
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

 return SwipeTimelineManager;
};

swipeTimelineManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeTimelineManager', swipeTimelineManager);