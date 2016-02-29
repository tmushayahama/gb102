var projectProgressSrv = function ($http, $q) {

 var ProjectProgressSrv = function () {
  this.projectProgress = [];
 };
 ProjectProgressSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectProgressSrv.prototype.getProjectProgress = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  self.projectProgress = [];
  $http.get('/api/project/' + projectId + '/progress').success(function (data) {
   self.projectProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectProgressSrv.prototype.getProjectProgress = function (projectId, progressId) {
  var self = this;
  var deferred = $q.defer();
  self.projectProgress = [];
  $http.get('/api/project/' + projectId + '/progress/' + progressId).success(function (data) {
   self.projectProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectProgressSrv.prototype.createProjectProgress = function (projectProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/progress/create',
   data: projectProgressData
  }).success(function (data) {
   self.projectProgress.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectProgressSrv.prototype.editProjectProgress = function (projectProgressData) {
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


 return ProjectProgressSrv;
};

projectProgressSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectProgressSrv', projectProgressSrv);