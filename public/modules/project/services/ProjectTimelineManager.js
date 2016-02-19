var projectProgressManager = function ($http, $q) {

 var ProjectProgressManager = function () {
  this.projectProgress = [];
 };
 ProjectProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProjectProgressManager.prototype.getProjectProgress = function (projectId, progressId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId + '/progress/' + progressId).success(function (data) {
   self.projectProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectProgressManager.prototype.editProjectProgress = function (projectProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/progress/edit',
   data: projectProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ProjectProgressManager;
};

projectProgressManager.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectProgressManager', projectProgressManager);