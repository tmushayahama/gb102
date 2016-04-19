var explorerActivitysSrv = function ($http, $q) {

 var ExplorerActivitysSrv = function () {
  this.explorerActivitys = [];
 };
 ExplorerActivitysSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerActivitysSrv.prototype.getExplorerActivitys = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerActivitys = [];
  $http.get('/api/explorer/' + explorerId + '/activitys').success(function (data) {
   self.explorerActivitys = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitysSrv.prototype.getExplorerActivity = function (explorerId, activityId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerActivitys = [];
  $http.get('/api/explorer/' + explorerId + '/activity/' + activityId).success(function (data) {
   self.explorerActivitys = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitysSrv.prototype.createExplorerActivity = function (explorerActivityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/activity/create',
   data: explorerActivityData
  }).success(function (data) {
   self.explorerActivitys.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitysSrv.prototype.editExplorerActivity = function (explorerActivityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/activity/edit',
   data: explorerActivityData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerActivitysSrv;
};

explorerActivitysSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerActivitysSrv', explorerActivitysSrv);