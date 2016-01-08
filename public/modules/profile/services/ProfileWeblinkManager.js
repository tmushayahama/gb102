var profileWeblinkManager = function ($http, $q) {

 var ProfileWeblinkManager = function () {
  this.profileWeblinks = [];
 };
 ProfileWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProfileWeblinkManager.prototype.getProfileWeblink = function (profileId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId + '/weblink/' + weblinkId).success(function (data) {
   self.profileWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileWeblinkManager.prototype.editProfileWeblink = function (profileWeblinkData) {
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

 return ProfileWeblinkManager;
};

profileWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileWeblinkManager', profileWeblinkManager);