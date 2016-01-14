var profileManager = function ($http, $q) {

 var ProfileManager = function () {
  this.profile = [];
 };
 ProfileManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileManager.prototype.getAllProfile = function () {
  var self = this;
  var deferred = $q.defer();
  self.profile = [];
  $http.get('/api/profile/all').success(function (data) {
   self.profile = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileManager.prototype.getMyProfile = function () {
  var self = this;
  var deferred = $q.defer();
  self.profile = [];
  $http.get('/api/profile/mine').success(function (data) {
   self.profile = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileManager.prototype.getProfile = function (profileId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.profile = [];
  $http.get('/api/profile/' + profileId + '//' + Id).success(function (data) {
   self.profile = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileManager.prototype.createProfile = function (profileData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/create',
   data: profileData
  }).success(function (data) {
   self.profile.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileManager.prototype.editProfile = function (profileData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profileedit',
   data: profileData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return ProfileManager;
};

profileManager.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileManager', profileManager);

