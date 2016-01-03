var profileCommentsManager = function ($http, $q) {

 var ProfileCommentsManager = function () {
  this.profileComments = [];
 };
 ProfileCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileCommentsManager.prototype.getProfileComments = function (profileId) {
  var self = this;
  var deferred = $q.defer();
  self.profileComments = [];
  $http.get('/api/profile/' + profileId + '/comments').success(function (data) {
   self.profileComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileCommentsManager.prototype.getProfileComment = function (profileId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.profileComments = [];
  $http.get('/api/profile/' + profileId + '/comment/' + commentId).success(function (data) {
   self.profileComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileCommentsManager.prototype.createProfileComment = function (profileCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/comment/create',
   data: profileCommentData
  }).success(function (data) {
   self.profileComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileCommentsManager.prototype.editProfileComment = function (profileCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/comment/edit',
   data: profileCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProfileCommentsManager;
};

profileCommentsManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileCommentsManager', profileCommentsManager);
