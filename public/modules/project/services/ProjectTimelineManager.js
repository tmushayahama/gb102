var projectTimelineManager = function ($http, $q) {

 var ProjectTimelineManager = function () {
  this.projectTimelines = [];
 };
 ProjectTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProjectTimelineManager.prototype.getProjectTimeline = function (projectId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId + '/timeline/' + timelineId).success(function (data) {
   self.projectTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectTimelineManager.prototype.editProjectTimeline = function (projectTimelineData) {
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

 return ProjectTimelineManager;
};

projectTimelineManager.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectTimelineManager', projectTimelineManager);