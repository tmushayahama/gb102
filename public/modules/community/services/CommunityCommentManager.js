var communityCommentManager = function ($http, $q) {

 var CommunityCommentManager = function () {
  this.communityComments = [];
 };
 CommunityCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CommunityCommentManager.prototype.getCommunityComment = function (communityId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId + '/comment/' + commentId).success(function (data) {
   self.communityComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunityCommentManager.prototype.editCommunityComment = function (communityCommentData) {
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

 return CommunityCommentManager;
};

communityCommentManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityCommentManager', communityCommentManager);
