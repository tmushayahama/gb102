var promiseTimelineManager = function ($http, $q) {

 var PromiseTimelineManager = function () {
  this.promiseTimelines = [];
 };
 PromiseTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 PromiseTimelineManager.prototype.getPromiseTimeline = function (promiseId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/promise/' + promiseId + '/timeline/' + timelineId).success(function (data) {
   self.promiseTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 PromiseTimelineManager.prototype.editPromiseTimeline = function (promiseTimelineData) {
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

 return PromiseTimelineManager;
};

promiseTimelineManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseTimelineManager', promiseTimelineManager);