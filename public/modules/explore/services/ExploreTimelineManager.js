var exploreTimelineManager = function ($http, $q) {

 var ExploreTimelineManager = function () {
  this.exploreTimelines = [];
 };
 ExploreTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExploreTimelineManager.prototype.getExploreTimeline = function (exploreId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/timeline/' + timelineId).success(function (data) {
   self.exploreTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreTimelineManager.prototype.editExploreTimeline = function (exploreTimelineData) {
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

 return ExploreTimelineManager;
};

exploreTimelineManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreTimelineManager', exploreTimelineManager);