var communityWeblinksManager = function ($http, $q) {

 var CommunityWeblinksManager = function () {
  this.communityWeblinks = [];
 };
 CommunityWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunityWeblinksManager.prototype.getCommunityWeblinks = function (communityId) {
  var self = this;
  var deferred = $q.defer();
  self.communityWeblinks = [];
  $http.get('/api/community/' + communityId + '/weblinks').success(function (data) {
   self.communityWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityWeblinksManager.prototype.getCommunityWeblink = function (communityId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.communityWeblinks = [];
  $http.get('/api/community/' + communityId + '/weblink/' + weblinkId).success(function (data) {
   self.communityWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityWeblinksManager.prototype.createCommunityWeblink = function (communityWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/weblink/create',
   data: communityWeblinkData
  }).success(function (data) {
   self.communityWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityWeblinksManager.prototype.editCommunityWeblink = function (communityWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/weblink/edit',
   data: communityWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CommunityWeblinksManager;
};


communityWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityWeblinksManager', communityWeblinksManager);