var adviceProgressManager = function ($http, $q) {

 var AdviceProgressManager = function () {
  this.adviceProgress = [];
 };
 AdviceProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceProgressManager.prototype.getAdviceProgress = function (adviceId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceProgress = [];
  $http.get('/api/advice/' + adviceId + '/progress').success(function (data) {
   self.adviceProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceProgressManager.prototype.getAdviceProgress = function (adviceId, progressId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceProgress = [];
  $http.get('/api/advice/' + adviceId + '/progress/' + progressId).success(function (data) {
   self.adviceProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceProgressManager.prototype.createAdviceProgress = function (adviceProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/progress/create',
   data: adviceProgressData
  }).success(function (data) {
   self.adviceProgress.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceProgressManager.prototype.editAdviceProgress = function (adviceProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/progress/edit',
   data: adviceProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AdviceProgressManager;
};

adviceProgressManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceProgressManager', adviceProgressManager);
