var promiseTimelinesManager = function ($http, $q) {

 var PromiseTimelinesManager = function () {
  this.promiseTimelines = [];
 };
 PromiseTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseTimelinesManager.prototype.getPromiseTimelines = function (promiseId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseTimelines = [];
  $http.get('/api/promise/' + promiseId + '/timelines').success(function (data) {
   self.promiseTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseTimelinesManager.prototype.getPromiseTimeline = function (promiseId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseTimelines = [];
  $http.get('/api/promise/' + promiseId + '/timeline/' + timelineId).success(function (data) {
   self.promiseTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseTimelinesManager.prototype.createPromiseTimeline = function (promiseTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/timeline/create',
   data: promiseTimelineData
  }).success(function (data) {
   self.promiseTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseTimelinesManager.prototype.editPromiseTimeline = function (promiseTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/timeline/edit',
   data: promiseTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return PromiseTimelinesManager;
};

promiseTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseTimelinesManager', promiseTimelinesManager);
