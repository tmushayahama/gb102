var exploreContributionsManager = function ($http, $q) {

 var ExploreContributionsManager = function () {
  this.exploreContributions = [];
 };
 ExploreContributionsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreContributionsManager.prototype.getExploreContributions = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreContributions = [];
  $http.get('/api/explore/' + exploreId + '/contributions').success(function (data) {
   self.exploreContributions = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributionsManager.prototype.getExploreContribution = function (exploreId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreContributions = [];
  $http.get('/api/explore/' + exploreId + '/contribution/' + contributionId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributionsManager.prototype.getExploreContributionLevel = function (exploreId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreContributions = [];
  $http.get('/api/explore/' + exploreId + '/contribution/' + contributionId + "/level").success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributionsManager.prototype.createExploreContribution = function (exploreContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/contribution/create',
   data: exploreContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributionsManager.prototype.editExploreContribution = function (exploreContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/contribution/edit',
   data: exploreContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreContributionsManager;
};

exploreContributionsManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreContributionsManager', exploreContributionsManager);
