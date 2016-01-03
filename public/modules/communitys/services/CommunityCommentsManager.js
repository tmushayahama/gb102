var communityCommentsManager = function ($http, $q) {

 var CommunityCommentsManager = function () {
  this.communityComments = [];
 };
 CommunityCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunityCommentsManager.prototype.getCommunityComments = function (communityId) {
  var self = this;
  var deferred = $q.defer();
  self.communityComments = [];
  $http.get('/api/community/' + communityId + '/comments').success(function (data) {
   self.communityComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityCommentsManager.prototype.getCommunityComment = function (communityId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.communityComments = [];
  $http.get('/api/community/' + communityId + '/comment/' + commentId).success(function (data) {
   self.communityComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityCommentsManager.prototype.createCommunityComment = function (communityCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/comment/create',
   data: communityCommentData
  }).success(function (data) {
   self.communityComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityCommentsManager.prototype.editCommunityComment = function (communityCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/comment/edit',
   data: communityCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CommunityCommentsManager;
};

communityCommentsManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityCommentsManager', communityCommentsManager);
