var projectsManager = function ($http, $q) {

 var ProjectsManager = function () {
  this.projects = [];
 };
 ProjectsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectsManager.prototype.getAllProjects = function () {
  var self = this;
  var deferred = $q.defer();
  self.projects = [];
  $http.get('/api/projects/all').success(function (data) {
   self.projects = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsManager.prototype.getMyProjects = function () {
  var self = this;
  var deferred = $q.defer();
  self.projects = [];
  $http.get('/api/projects/mine').success(function (data) {
   self.projects = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectsManager.prototype.getProject = function (projectId, Id) {
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

 ProjectsManager.prototype.createProject = function (projectData) {
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

 ProjectsManager.prototype.editProject = function (projectData) {
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
 return ProjectsManager;
};

projectsManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectsManager', projectsManager);

