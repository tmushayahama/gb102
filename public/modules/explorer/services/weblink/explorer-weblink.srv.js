var explorerWeblinkSrv = function ($http, $q) {

 var ExplorerWeblinkSrv = function () {
  this.explorerWeblinks = [];
 };
 ExplorerWeblinkSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerWeblinkSrv.prototype.getExplorerWeblink = function (explorerId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/weblink/' + weblinkId).success(function (data) {
   self.explorerWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerWeblinkSrv.prototype.editExplorerWeblink = function (explorerWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/weblink/edit',
   data: explorerWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerWeblinkSrv;
};

explorerWeblinkSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerWeblinkSrv', explorerWeblinkSrv);