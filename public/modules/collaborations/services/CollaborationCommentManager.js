var collaborationCommentManager = function ($http, $q) {

 var CollaborationCommentManager = function () {
  this.collaborationComments = [];
 };
 CollaborationCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationCommentManager.prototype.getCollaborationComment = function (collaborationId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/comment/' + commentId).success(function (data) {
   self.collaborationComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationCommentManager.prototype.editCollaborationComment = function (collaborationCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/comment/edit',
   data: collaborationCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CollaborationCommentManager;
};

collaborationCommentManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationCommentManager', collaborationCommentManager);
