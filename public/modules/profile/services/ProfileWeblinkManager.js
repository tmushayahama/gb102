var profileWeblinkSrv = function ($http, $q) {

 var ProfileWeblinkSrv = function () {
  this.profileWeblinks = [];
 };
 ProfileWeblinkSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProfileWeblinkSrv.prototype.getProfileWeblink = function (profileId, weblinkId) {
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


 ProfileWeblinkSrv.prototype.editProfileWeblink = function (profileWeblinkData) {
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

 return ProfileWeblinkSrv;
};

profileWeblinkSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileWeblinkSrv', profileWeblinkSrv);