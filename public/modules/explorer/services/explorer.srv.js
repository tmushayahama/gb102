var explorerSrv = function ($http, $q) {

 var ExplorerSrv = function () {
  this.explorer = [];
 };
 ExplorerSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerSrv.prototype.getExplorer = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId).success(function (data) {
   self.explorer = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSrv.prototype.getSubExplorers = function (parentExplorerId) {
  var self = this;
  var deferred = $q.defer();
  //self.explorers = [];
  $http.get('/api/explorers/subexplorers/' + parentExplorerId).success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSrv.prototype.getSubExplorersStats = function (parentExplorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorers/subexplorers/' + parentExplorerId + "/all/stats").success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerSrv.prototype.editExplorer = function (explorerData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/edit',
   data: explorerData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerSrv;
};

explorerSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerSrv', explorerSrv);
