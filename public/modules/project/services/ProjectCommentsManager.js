var projectCommentsSrv = function ($http, $q) {

 var ProjectCommentsSrv = function () {
  this.projectComments = [];
 };
 ProjectCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectCommentsSrv.prototype.getProjectComments = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  self.projectComments = [];
  $http.get('/api/project/' + projectId + '/comments').success(function (data) {
   self.projectComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectCommentsSrv.prototype.getProjectComment = function (projectId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.projectComments = [];
  $http.get('/api/project/' + projectId + '/comment/' + commentId).success(function (data) {
   self.projectComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectCommentsSrv.prototype.createProjectComment = function (projectCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/comment/create',
   data: projectCommentData
  }).success(function (data) {
   self.projectComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectCommentsSrv.prototype.editProjectComment = function (projectCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/comment/edit',
   data: projectCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProjectCommentsSrv;
};

projectCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectCommentsSrv', projectCommentsSrv);
