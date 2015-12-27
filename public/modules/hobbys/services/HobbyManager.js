var hobbyManager = function ($http, $q) {

 var HobbyManager = function () {
  this.hobby = [];
 };
 HobbyManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 HobbyManager.prototype.getHobby = function (hobbyId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/hobby/' + hobbyId).success(function (data) {
   self.hobby = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 HobbyManager.prototype.editHobby = function (hobbyData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/edit',
   data: hobbyData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return HobbyManager;
};

hobbyManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbyManager', hobbyManager);
