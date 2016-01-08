var profilesManager = function ($http, $q) {

 var ProfilesManager = function () {
  this.profiles = [];
 };
 ProfilesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfilesManager.prototype.getAllProfiles = function () {
  var self = this;
  var deferred = $q.defer();
  self.profiles = [];
  $http.get('/api/profiles/all').success(function (data) {
   self.profiles = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfilesManager.prototype.getMyProfiles = function () {
  var self = this;
  var deferred = $q.defer();
  self.profiles = [];
  $http.get('/api/profiles/mine').success(function (data) {
   self.profiles = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfilesManager.prototype.getProfile = function (profileId, Id) {
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

 ProfilesManager.prototype.createProfile = function (profileData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/create',
   data: profileData
  }).success(function (data) {
   self.profiles.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfilesManager.prototype.editProfile = function (profileData) {
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
 return ProfilesManager;
};

profilesManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfilesManager', profilesManager);

