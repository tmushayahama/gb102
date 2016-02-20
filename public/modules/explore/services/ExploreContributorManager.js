var exploreContributorManager = function ($http, $q) {

 var ExploreContributorManager = function () {
  this.exploreContributors = [];
 };
 ExploreContributorManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExploreContributorManager.prototype.getExploreContributor = function (exploreId, contributorId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/contributor/' + contributorId).success(function (data) {
   self.exploreContributor = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreContributorManager.prototype.editExploreContributor = function (exploreContributorData) {
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

 return ExploreContributorManager;
};

exploreContributorManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreContributorManager', exploreContributorManager);
