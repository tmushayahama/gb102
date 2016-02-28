var projectSrv = function ($http, $q) {

 var ProjectSrv = function () {
  this.project = [];
 };
 ProjectSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectSrv.prototype.getProject = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId).success(function (data) {
   //self.project = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectSrv.prototype.getSubProjects = function (parentexplorerId) {
  var self = this;
  var deferred = $q.defer();
  //self.projects = [];
  $http.get('/api/projects/subprojects/' + parentexplorerId).success(function (data) {
   //self.projects = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectSrv.prototype.editProject = function (projectData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/edit',
   data: projectData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ProjectSrv;
};

projectSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectSrv', projectSrv);
