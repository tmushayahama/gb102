var explorerWeblinksSrv = function ($http, $q) {

 var ExplorerWeblinksSrv = function () {
  this.explorerWeblinks = [];
 };
 ExplorerWeblinksSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerWeblinksSrv.prototype.getExplorerWeblinks = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerWeblinks = [];
  $http.get('/api/explorer/' + explorerId + '/weblinks').success(function (data) {
   self.explorerWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerWeblinksSrv.prototype.getExplorerWeblink = function (explorerId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerWeblinks = [];
  $http.get('/api/explorer/' + explorerId + '/weblink/' + weblinkId).success(function (data) {
   self.explorerWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerWeblinksSrv.prototype.createExplorerWeblink = function (explorerWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/weblink/create',
   data: explorerWeblinkData
  }).success(function (data) {
   self.explorerWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerWeblinksSrv.prototype.editExplorerWeblink = function (explorerWeblinkData) {
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


 return ExplorerWeblinksSrv;
};


explorerWeblinksSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerWeblinksSrv', explorerWeblinksSrv);