var groupCommentManager = function ($http, $q) {

 var GroupCommentManager = function () {
  this.groupComments = [];
 };
 GroupCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GroupCommentManager.prototype.getGroupComment = function (groupId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/group/' + groupId + '/comment/' + commentId).success(function (data) {
   self.groupComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GroupCommentManager.prototype.editGroupComment = function (groupCommentData) {
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

 return GroupCommentManager;
};

groupCommentManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupCommentManager', groupCommentManager);
