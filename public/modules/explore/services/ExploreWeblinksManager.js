var exploreWeblinksManager = function ($http, $q) {

 var ExploreWeblinksManager = function () {
  this.exploreWeblinks = [];
 };
 ExploreWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreWeblinksManager.prototype.getExploreWeblinks = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreWeblinks = [];
  $http.get('/api/explore/' + exploreId + '/weblinks').success(function (data) {
   self.exploreWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreWeblinksManager.prototype.getExploreWeblink = function (exploreId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreWeblinks = [];
  $http.get('/api/explore/' + exploreId + '/weblink/' + weblinkId).success(function (data) {
   self.exploreWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreWeblinksManager.prototype.createExploreWeblink = function (exploreWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/weblink/create',
   data: exploreWeblinkData
  }).success(function (data) {
   self.exploreWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreWeblinksManager.prototype.editExploreWeblink = function (exploreWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/weblink/edit',
   data: exploreWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreWeblinksManager;
};


exploreWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreWeblinksManager', exploreWeblinksManager);