var explorerComponentsSrv = function ($http, $q) {

 var ExplorerComponentsSrv = function () {
 };
 ExplorerComponentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerComponentsSrv.prototype.getExplorerComponents = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/components').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerComponentsSrv.prototype.getSubComponents = function (componentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/component/' + componentId + '/components').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerComponentsSrv.prototype.getExplorerComponent = function (explorerId, componentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/component/' + componentId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerComponentsSrv.prototype.createExplorerComponent = function (explorerComponentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/component/create',
   data: explorerComponentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerComponentsSrv.prototype.editExplorerComponent = function (explorerComponentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/component/edit',
   data: explorerComponentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerComponentsSrv.prototype.editExplorerComponent = function (explorerComponentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/component/edit',
   data: explorerComponentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerComponentsSrv;
};

explorerComponentsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerComponentsSrv', explorerComponentsSrv);