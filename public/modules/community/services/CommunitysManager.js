var communitysManager = function ($http, $q) {

 var CommunitysManager = function () {
  this.communitys = [];
 };
 CommunitysManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunitysManager.prototype.getAllCommunitys = function () {
  var self = this;
  var deferred = $q.defer();
  self.communitys = [];
  $http.get('/api/communitys/all').success(function (data) {
   self.communitys = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunitysManager.prototype.getMyCommunitys = function () {
  var self = this;
  var deferred = $q.defer();
  self.communitys = [];
  $http.get('/api/communitys/mine').success(function (data) {
   self.communitys = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunitysManager.prototype.getCommunity = function (communityId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.community = [];
  $http.get('/api/community/' + communityId + '//' + Id).success(function (data) {
   self.community = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunitysManager.prototype.createCommunity = function (communityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/create',
   data: communityData
  }).success(function (data) {
   self.communitys.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunitysManager.prototype.editCommunity = function (communityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/communityedit',
   data: communityData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return CommunitysManager;
};

communitysManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunitysManager', communitysManager);

