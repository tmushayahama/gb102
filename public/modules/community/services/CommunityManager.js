var communityManager = function ($http, $q) {

 var CommunityManager = function () {
  this.users = [];
 };
 CommunityManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunityManager.prototype.getUsers = function () {
  var self = this;
  var deferred = $q.defer();
  self.users = [];
  $http.get('/api/community/users').success(function (data) {
   self.users = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CommunityManager;
};

communityManager.$inject = ['$http', '$q'];

angular.module('app.community').service('CommunityManager', communityManager);
