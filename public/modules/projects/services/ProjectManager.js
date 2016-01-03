var projectManager = function ($http, $q) {

 var ProjectManager = function () {
  this.project = [];
 };
 ProjectManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectManager.prototype.getProject = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId).success(function (data) {
   self.project = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectManager.prototype.editProject = function (projectData) {
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

 return ProjectManager;
};

projectManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectManager', projectManager);
