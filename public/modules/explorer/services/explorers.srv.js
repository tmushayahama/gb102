var explorersSrv = function ($http, $q) {

 var ExplorersSrv = function () {
  this.explorers = [];
 };
 ExplorersSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorersSrv.prototype.getExplorers = function (mode) {
  var self = this;
  var deferred = $q.defer();
  //self.explorers = [];
  $http.get('/api/explorers/all/mode/' + mode).success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getAllExplorers = function () {
  var self = this;
  var deferred = $q.defer();
  //self.explorers = [];
  $http.get('/api/explorers/all/').success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getUserExplorers = function (userId) {
  var self = this;
  var deferred = $q.defer();
  //self.explorers = [];
  $http.get('/api/explorers/user/' + userId + '/all').success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getUserExplorersStats = function (userId) {
  var self = this;
  var deferred = $q.defer();
  //self.explorers = [];
  $http.get('/api/explorers/user/' + userId + '/all/stats').success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getAppExplorers = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.explorers = [];
  $http.get('/api/explorers/all/' + appName).success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getAppExplorersFeatured = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.explorers = [];
  $http.get('/api/explorers/all/' + appName + '/featured').success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getUserAppExplorers = function (userId, appName) {
  var self = this;
  var deferred = $q.defer();
  // self.explorers = [];
  $http.get('/api/explorers/user/' + userId + '/all/' + appName).success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getMyExplorers = function () {
  var self = this;
  var deferred = $q.defer();
  //self.explorers = [];
  $http.get('/api/explorers/mine').success(function (data) {
   //self.explorers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getExplorer = function (explorerId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.explorer = [];
  $http.get('/api/explorer/' + explorerId + '//' + Id).success(function (data) {
   self.explorer = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.createExplorer = function (explorerData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/create',
   data: explorerData
  }).success(function (data) {
   self.explorers.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.editExplorer = function (explorerData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/exploreredit',
   data: explorerData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorersSrv.prototype.getExplorerRequestOptions = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/requestoptions').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return ExplorersSrv;
};

explorersSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorersSrv', explorersSrv);

