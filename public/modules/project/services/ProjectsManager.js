var projectsSrv = function ($http, $q) {

 var ProjectsSrv = function () {
  this.projects = [];
 };
 ProjectsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectsSrv.prototype.getAllProjects = function () {
  var self = this;
  var deferred = $q.defer();
  //self.projects = [];
  $http.get('/api/projects/all').success(function (data) {
   //self.projects = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsSrv.prototype.getAppProjects = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.projects = [];
  $http.get('/api/projects/all/' + appName).success(function (data) {
   //self.projects = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsSrv.prototype.getMyProjects = function () {
  var self = this;
  var deferred = $q.defer();
  //self.projects = [];
  $http.get('/api/projects/mine').success(function (data) {
   //self.projects = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsSrv.prototype.getProject = function (projectId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.project = [];
  $http.get('/api/project/' + projectId + '//' + Id).success(function (data) {
   self.project = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsSrv.prototype.createProject = function (projectData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/create',
   data: projectData
  }).success(function (data) {
   self.projects.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsSrv.prototype.editProject = function (projectData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/projectedit',
   data: projectData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return ProjectsSrv;
};

projectsSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectsSrv', projectsSrv);

