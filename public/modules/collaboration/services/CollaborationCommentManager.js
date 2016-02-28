var collaborationCommentSrv = function ($http, $q) {

 var CollaborationCommentSrv = function () {
  this.collaborationComments = [];
 };
 CollaborationCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationCommentSrv.prototype.getCollaborationComment = function (collaborationId, commentId) {
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


 CollaborationCommentSrv.prototype.editCollaborationComment = function (collaborationCommentData) {
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

 return CollaborationCommentSrv;
};

collaborationCommentSrv.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationCommentSrv', collaborationCommentSrv);
