var profileSrv = function ($http, $q) {

 var ProfileSrv = function () {
  this.profile;
 };
 ProfileSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileSrv.prototype.getProfile = function (profileId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId).success(function (data) {
   self.profile = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileSrv.prototype.getUserConnections = function (userId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + userId + "/connections").success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileSrv.prototype.editProfile = function (profileData) {
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

 return ProfileSrv;
};

profileSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileSrv', profileSrv);
