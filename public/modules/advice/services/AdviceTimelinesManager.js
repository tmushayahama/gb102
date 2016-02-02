var adviceTimelinesManager = function ($http, $q) {

 var AdviceTimelinesManager = function () {
  this.adviceTimelines = [];
 };
 AdviceTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceTimelinesManager.prototype.getAdviceTimelines = function (adviceId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceTimelines = [];
  $http.get('/api/advice/' + adviceId + '/timelines').success(function (data) {
   self.adviceTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTimelinesManager.prototype.getAdviceTimeline = function (adviceId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceTimelines = [];
  $http.get('/api/advice/' + adviceId + '/timeline/' + timelineId).success(function (data) {
   self.adviceTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTimelinesManager.prototype.createAdviceTimeline = function (adviceTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/timeline/create',
   data: adviceTimelineData
  }).success(function (data) {
   self.adviceTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTimelinesManager.prototype.editAdviceTimeline = function (adviceTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/timeline/edit',
   data: adviceTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AdviceTimelinesManager;
};

adviceTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceTimelinesManager', adviceTimelinesManager);
