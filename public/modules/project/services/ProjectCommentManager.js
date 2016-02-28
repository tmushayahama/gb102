var projectCommentSrv = function ($http, $q) {

 var ProjectCommentSrv = function () {
  this.projectComments = [];
 };
 ProjectCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProjectCommentSrv.prototype.getProjectComment = function (projectId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId + '/comment/' + commentId).success(function (data) {
   self.projectComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectCommentSrv.prototype.editProjectComment = function (projectCommentData) {
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

 return ProjectCommentSrv;
};

projectCommentSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectCommentSrv', projectCommentSrv);
