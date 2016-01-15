var userProfileSectionManager = function ($http, $q) {

 var UserProfileSectionManager = function () {
  this.userProfileSections = [];
 };
 UserProfileSectionManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 UserProfileSectionManager.prototype.getUserProfileSection = function (userId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + userId + '/sections').success(function (data) {
   self.userProfileSections = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 UserProfileSectionManager.prototype.editProfile = function (profileData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/edit',
   data: profileData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return UserProfileSectionManager;
};

userProfileSectionManager.$inject = ['$http', '$q'];

angular.module('app.profile').service('UserProfileSectionManager', userProfileSectionManager);
