var teachTimelinesManager = function ($http, $q) {

 var TeachTimelinesManager = function () {
  this.teachTimelines = [];
 };
 TeachTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachTimelinesManager.prototype.getTeachTimelines = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTimelines = [];
  $http.get('/api/teach/' + teachId + '/timelines').success(function (data) {
   self.teachTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTimelinesManager.prototype.getTeachTimeline = function (teachId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTimelines = [];
  $http.get('/api/teach/' + teachId + '/timeline/' + timelineId).success(function (data) {
   self.teachTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTimelinesManager.prototype.createTeachTimeline = function (teachTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/timeline/create',
   data: teachTimelineData
  }).success(function (data) {
   self.teachTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTimelinesManager.prototype.editTeachTimeline = function (teachTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/timeline/edit',
   data: teachTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return TeachTimelinesManager;
};

teachTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachTimelinesManager', teachTimelinesManager);
