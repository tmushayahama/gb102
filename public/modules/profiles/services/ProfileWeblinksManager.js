var profileWeblinksManager = function ($http, $q) {

 var ProfileWeblinksManager = function () {
  this.profileWeblinks = [];
 };
 ProfileWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileWeblinksManager.prototype.getProfileWeblinks = function (profileId) {
  var self = this;
  var deferred = $q.defer();
  self.profileWeblinks = [];
  $http.get('/api/profile/' + profileId + '/weblinks').success(function (data) {
   self.profileWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileWeblinksManager.prototype.getProfileWeblink = function (profileId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.profileWeblinks = [];
  $http.get('/api/profile/' + profileId + '/weblink/' + weblinkId).success(function (data) {
   self.profileWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileWeblinksManager.prototype.createProfileWeblink = function (profileWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/weblink/create',
   data: profileWeblinkData
  }).success(function (data) {
   self.profileWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileWeblinksManager.prototype.editProfileWeblink = function (profileWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/weblink/edit',
   data: profileWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProfileWeblinksManager;
};


profileWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileWeblinksManager', profileWeblinksManager);