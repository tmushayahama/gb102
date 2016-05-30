var authSrv = function ($http, $q) {

 var AuthSrv = function () {
 };

 AuthSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AuthSrv.prototype.register = function (user) {
  var self = this;
  self.error = '';
  var deferred = $q.defer();
  $http.post('/api/register', user).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AuthSrv;
};

authSrv.$inject = ['$http', '$q'];

angular.module('app').service('AuthSrv', authSrv);