var exploresManager = function ($http, $q) {

 var ExploresManager = function () {
  this.explores = [];
 };
 ExploresManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploresManager.prototype.getAllExplores = function () {
  var self = this;
  var deferred = $q.defer();
  self.explores = [];
  $http.get('/api/explores/all').success(function (data) {
   self.explores = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploresManager.prototype.getMyExplores = function () {
  var self = this;
  var deferred = $q.defer();
  self.explores = [];
  $http.get('/api/explores/mine').success(function (data) {
   self.explores = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploresManager.prototype.getExplore = function (exploreId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.explore = [];
  $http.get('/api/explore/' + exploreId + '//' + Id).success(function (data) {
   self.explore = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploresManager.prototype.createExplore = function (exploreData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/create',
   data: exploreData
  }).success(function (data) {
   self.explores.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploresManager.prototype.editExplore = function (exploreData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/exploreedit',
   data: exploreData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return ExploresManager;
};

exploresManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploresManager', exploresManager);

