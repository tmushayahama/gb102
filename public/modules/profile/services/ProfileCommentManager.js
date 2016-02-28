var profileCommentSrv = function ($http, $q) {

 var ProfileCommentSrv = function () {
  this.profileComments = [];
 };
 ProfileCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProfileCommentSrv.prototype.getProfileComment = function (profileId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId + '/comment/' + commentId).success(function (data) {
   self.profileComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileCommentSrv.prototype.editProfileComment = function (profileCommentData) {
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

 return ProfileCommentSrv;
};

profileCommentSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileCommentSrv', profileCommentSrv);
