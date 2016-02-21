var exploreContributorsManager = function ($http, $q) {

 var ExploreContributorsManager = function () {
  this.exploreContributors = [];
 };
 ExploreContributorsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreContributorsManager.prototype.getExploreContributors = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreContributors = [];
  $http.get('/api/explore/' + exploreId + '/contributors').success(function (data) {
   self.exploreContributors = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributorsManager.prototype.getExploreContributor = function (exploreId, contributorId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreContributors = [];
  $http.get('/api/explore/' + exploreId + '/contributor/' + contributorId).success(function (data) {
   self.exploreContributors = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributorsManager.prototype.createExploreContributor = function (exploreContributorData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/contributor/create',
   data: exploreContributorData
  }).success(function (data) {
   self.exploreContributors.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreContributorsManager.prototype.editExploreContributor = function (exploreContributorData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/contributor/edit',
   data: exploreContributorData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreContributorsManager;
};

exploreContributorsManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreContributorsManager', exploreContributorsManager);
