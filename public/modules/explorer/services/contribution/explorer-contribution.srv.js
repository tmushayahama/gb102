var explorerContributionSrv = function ($http, $q) {

 var ExplorerContributionSrv = function () {
  this.explorerContributions = [];
 };
 ExplorerContributionSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerContributionSrv.prototype.getExplorerContribution = function (explorerId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/contribution/' + contributionId).success(function (data) {
   self.explorerContribution = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerContributionSrv.prototype.editExplorerContribution = function (explorerContributionData) {
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

 return ExplorerContributionSrv;
};

explorerContributionSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerContributionSrv', explorerContributionSrv);
