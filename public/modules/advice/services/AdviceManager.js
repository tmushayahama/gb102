var adviceManager = function ($http, $q) {

 var AdviceManager = function () {
  this.advice = [];
 };
 AdviceManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceManager.prototype.getAdvice = function (adviceId) {
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

 AdviceManager.prototype.getSubAdvices = function (parentExploreId) {
  var self = this;
  var deferred = $q.defer();
  //self.advices = [];
  $http.get('/api/advices/subadvices/' + parentExploreId).success(function (data) {
   //self.advices = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceManager.prototype.editAdvice = function (adviceData) {
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

 return AdviceManager;
};

adviceManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceManager', adviceManager);
