var explorerContributionsSrv = function ($http, $q) {

 var ExplorerContributionsSrv = function () {
  this.explorerContributions = [];
 };
 ExplorerContributionsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerContributionsSrv.prototype.getExplorerContributions = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerContributions = [];
  $http.get('/api/explorer/' + explorerId + '/contributions').success(function (data) {
   self.explorerContributions = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerContributionsSrv.prototype.getExplorerContribution = function (explorerId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerContributions = [];
  $http.get('/api/explorer/' + explorerId + '/contribution/' + contributionId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerContributionsSrv.prototype.getExplorerContributionLevel = function (explorerId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerContributions = [];
  $http.get('/api/explorer/' + explorerId + '/contribution/' + contributionId + "/level").success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerContributionsSrv.prototype.createExplorerContribution = function (explorerContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/contribution/create',
   data: explorerContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerContributionsSrv.prototype.editExplorerContribution = function (explorerContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/contribution/edit',
   data: explorerContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerContributionsSrv;
};

explorerContributionsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerContributionsSrv', explorerContributionsSrv);
