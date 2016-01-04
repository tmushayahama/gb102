var exploreManager = function ($http, $q) {

 var ExploreManager = function () {
  this.explore = [];
 };
 ExploreManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreManager.prototype.getExplore = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId).success(function (data) {
   self.explore = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreManager.prototype.editExplore = function (exploreData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/edit',
   data: exploreData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExploreManager;
};

exploreManager.$inject = ['$http', '$q'];

angular.module('app.explores').service('ExploreManager', exploreManager);
