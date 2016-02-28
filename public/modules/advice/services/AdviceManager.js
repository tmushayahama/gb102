var adviceSrv = function ($http, $q) {

 var AdviceSrv = function () {
  this.advice = [];
 };
 AdviceSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceSrv.prototype.getAdvice = function (adviceId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/advice/' + adviceId).success(function (data) {
   //self.advice = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceSrv.prototype.getSubAdvices = function (parentexplorerId) {
  var self = this;
  var deferred = $q.defer();
  //self.advices = [];
  $http.get('/api/advices/subadvices/' + parentexplorerId).success(function (data) {
   //self.advices = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceSrv.prototype.editAdvice = function (adviceData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/edit',
   data: adviceData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return AdviceSrv;
};

adviceSrv.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceSrv', adviceSrv);
