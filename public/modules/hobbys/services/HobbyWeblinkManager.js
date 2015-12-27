var hobbyWeblinkManager = function ($http, $q) {

 var HobbyWeblinkManager = function () {
  this.hobbyWeblinks = [];
 };
 HobbyWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 HobbyWeblinkManager.prototype.getHobbyWeblink = function (hobbyId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/hobby/' + hobbyId + '/weblink/' + weblinkId).success(function (data) {
   self.hobbyWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 HobbyWeblinkManager.prototype.editHobbyWeblink = function (hobbyWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/weblink/edit',
   data: hobbyWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return HobbyWeblinkManager;
};

hobbyWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbyWeblinkManager', hobbyWeblinkManager);