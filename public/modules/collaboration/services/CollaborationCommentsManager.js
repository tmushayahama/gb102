var collaborationCommentsSrv = function ($http, $q) {

 var CollaborationCommentsSrv = function () {
  this.collaborationComments = [];
 };
 CollaborationCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationCommentsSrv.prototype.getCollaborationComments = function (collaborationId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationComments = [];
  $http.get('/api/collaboration/' + collaborationId + '/comments').success(function (data) {
   self.collaborationComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationCommentsSrv.prototype.getCollaborationComment = function (collaborationId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationComments = [];
  $http.get('/api/collaboration/' + collaborationId + '/comment/' + commentId).success(function (data) {
   self.collaborationComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationCommentsSrv.prototype.createCollaborationComment = function (collaborationCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/comment/create',
   data: collaborationCommentData
  }).success(function (data) {
   self.collaborationComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationCommentsSrv.prototype.editCollaborationComment = function (collaborationCommentData) {
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


 return CollaborationCommentsSrv;
};

collaborationCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationCommentsSrv', collaborationCommentsSrv);
