var projectWeblinksSrv = function ($http, $q) {

 var ProjectWeblinksSrv = function () {
  this.projectWeblinks = [];
 };
 ProjectWeblinksSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectWeblinksSrv.prototype.getProjectWeblinks = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  self.projectWeblinks = [];
  $http.get('/api/project/' + projectId + '/weblinks').success(function (data) {
   self.projectWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectWeblinksSrv.prototype.getProjectWeblink = function (projectId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.projectWeblinks = [];
  $http.get('/api/project/' + projectId + '/weblink/' + weblinkId).success(function (data) {
   self.projectWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectWeblinksSrv.prototype.createProjectWeblink = function (projectWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/weblink/create',
   data: projectWeblinkData
  }).success(function (data) {
   self.projectWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectWeblinksSrv.prototype.editProjectWeblink = function (projectWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/weblink/edit',
   data: projectWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProjectWeblinksSrv;
};


projectWeblinksSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectWeblinksSrv', projectWeblinksSrv);