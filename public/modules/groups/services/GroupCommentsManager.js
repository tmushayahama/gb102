var groupCommentsManager = function ($http, $q) {

 var GroupCommentsManager = function () {
  this.groupComments = [];
 };
 GroupCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupCommentsManager.prototype.getGroupComments = function (groupId) {
  var self = this;
  var deferred = $q.defer();
  self.groupComments = [];
  $http.get('/api/group/' + groupId + '/comments').success(function (data) {
   self.groupComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupCommentsManager.prototype.getGroupComment = function (groupId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.groupComments = [];
  $http.get('/api/group/' + groupId + '/comment/' + commentId).success(function (data) {
   self.groupComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupCommentsManager.prototype.createGroupComment = function (groupCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/comment/create',
   data: groupCommentData
  }).success(function (data) {
   self.groupComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupCommentsManager.prototype.editGroupComment = function (groupCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/comment/edit',
   data: groupCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GroupCommentsManager;
};

groupCommentsManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupCommentsManager', groupCommentsManager);
