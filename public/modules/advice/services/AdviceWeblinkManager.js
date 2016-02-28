var adviceWeblinkSrv = function ($http, $q) {

 var AdviceWeblinkSrv = function () {
  this.adviceWeblinks = [];
 };
 AdviceWeblinkSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 AdviceWeblinkSrv.prototype.getAdviceWeblink = function (adviceId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/advice/' + adviceId + '/weblink/' + weblinkId).success(function (data) {
   self.adviceWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 AdviceWeblinkSrv.prototype.editAdviceWeblink = function (adviceWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/weblink/edit',
   data: adviceWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return AdviceWeblinkSrv;
};

adviceWeblinkSrv.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceWeblinkSrv', adviceWeblinkSrv);