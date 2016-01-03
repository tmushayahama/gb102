var projectCommentManager = function ($http, $q) {

 var ProjectCommentManager = function () {
  this.projectComments = [];
 };
 ProjectCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProjectCommentManager.prototype.getProjectComment = function (projectId, commentId) {
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


 ProjectCommentManager.prototype.editProjectComment = function (projectCommentData) {
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

 return ProjectCommentManager;
};

projectCommentManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectCommentManager', projectCommentManager);
