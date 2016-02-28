var advicesSrv = function ($http, $q) {

 var AdvicesSrv = function () {
  this.advices = [];
 };
 AdvicesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdvicesSrv.prototype.getAllAdvices = function () {
  var self = this;
  var deferred = $q.defer();
  //self.advices = [];
  $http.get('/api/advices/all').success(function (data) {
   //self.advices = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdvicesSrv.prototype.getAppAdvices = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.advices = [];
  $http.get('/api/advices/all/' + appName).success(function (data) {
   //self.advices = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdvicesSrv.prototype.getMyAdvices = function () {
  var self = this;
  var deferred = $q.defer();
  //self.advices = [];
  $http.get('/api/advices/mine').success(function (data) {
   //self.advices = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdvicesSrv.prototype.getAdvice = function (adviceId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.advice = [];
  $http.get('/api/advice/' + adviceId + '//' + Id).success(function (data) {
   self.advice = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdvicesSrv.prototype.createAdvice = function (adviceData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/create',
   data: adviceData
  }).success(function (data) {
   self.advices.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdvicesSrv.prototype.editAdvice = function (adviceData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/adviceedit',
   data: adviceData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return AdvicesSrv;
};

advicesSrv.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdvicesSrv', advicesSrv);

