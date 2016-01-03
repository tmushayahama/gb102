var projectTimelinesManager = function ($http, $q) {

 var ProjectTimelinesManager = function () {
  this.projectTimelines = [];
 };
 ProjectTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectTimelinesManager.prototype.getProjectTimelines = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  self.projectTimelines = [];
  $http.get('/api/project/' + projectId + '/timelines').success(function (data) {
   self.projectTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTimelinesManager.prototype.getProjectTimeline = function (projectId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.projectTimelines = [];
  $http.get('/api/project/' + projectId + '/timeline/' + timelineId).success(function (data) {
   self.projectTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTimelinesManager.prototype.createProjectTimeline = function (projectTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/timeline/create',
   data: projectTimelineData
  }).success(function (data) {
   self.projectTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTimelinesManager.prototype.editProjectTimeline = function (projectTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/timeline/edit',
   data: projectTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProjectTimelinesManager;
};

projectTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectTimelinesManager', projectTimelinesManager);
