var teachTimelinesSrv = function ($http, $q) {

 var TeachTimelinesSrv = function () {
  this.teachTimelines = [];
 };
 TeachTimelinesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachTimelinesSrv.prototype.getTeachTimelines = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTimelines = [];
  $http.get('/api/teach/' + teachId + '/progress').success(function (data) {
   self.teachTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTimelinesSrv.prototype.getTeachTimeline = function (teachId, progressId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTimelines = [];
  $http.get('/api/teach/' + teachId + '/progress/' + progressId).success(function (data) {
   self.teachTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTimelinesSrv.prototype.createTeachTimeline = function (teachTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/progress/create',
   data: teachTimelineData
  }).success(function (data) {
   self.teachTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTimelinesSrv.prototype.editTeachTimeline = function (teachTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/progress/edit',
   data: teachTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return TeachTimelinesSrv;
};

teachTimelinesSrv.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachTimelinesSrv', teachTimelinesSrv);
