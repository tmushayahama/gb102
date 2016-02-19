var exploreProgressManager = function ($http, $q) {

 var ExploreProgressManager = function () {
  this.exploreProgress = [];
 };
 ExploreProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExploreProgressManager.prototype.getExploreProgress = function (exploreId, progressId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/progress/' + progressId).success(function (data) {
   self.exploreProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreProgressManager.prototype.editExploreProgress = function (exploreProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/progress/edit',
   data: exploreProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExploreProgressManager;
};

exploreProgressManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreProgressManager', exploreProgressManager);