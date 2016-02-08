var teachTimelineManager = function ($http, $q) {

 var TeachTimelineManager = function () {
  this.teachTimelines = [];
 };
 TeachTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 TeachTimelineManager.prototype.getTeachTimeline = function (teachId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId + '/timeline/' + timelineId).success(function (data) {
   self.teachTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 TeachTimelineManager.prototype.editTeachTimeline = function (teachTimelineData) {
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

 return TeachTimelineManager;
};

teachTimelineManager.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachTimelineManager', teachTimelineManager);