var contributionsSrv = function ($http, $q) {

 var ContributionsSrv = function () {
  this.explorerContributions = [];
 };
 ContributionsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ContributionsSrv.prototype.getComponentContributions = function (componentId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerContributions = [];
  $http.get('/api/explorer/' + componentId + '/contributions').success(function (data) {
   self.explorerContributions = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ContributionsSrv.prototype.getComponentContribution = function (componentId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerContributions = [];
  $http.get('/api/explorer/' + componentId + '/contribution/' + contributionId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ContributionsSrv.prototype.getContributionLevel = function (componentId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerContributions = [];
  $http.get('/api/explorer/' + componentId + '/contribution/' + contributionId + "/level").success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ContributionsSrv.prototype.createComponentContribution = function (componentContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/contribution/create',
   data: componentContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ContributionsSrv.prototype.editComponentContribution = function (componentContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/contribution/edit',
   data: componentContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ContributionsSrv;
};

contributionsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ContributionsSrv', contributionsSrv);
