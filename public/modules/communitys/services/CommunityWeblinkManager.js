var communityWeblinkManager = function ($http, $q) {

 var CommunityWeblinkManager = function () {
  this.communityWeblinks = [];
 };
 CommunityWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CommunityWeblinkManager.prototype.getCommunityWeblink = function (communityId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId + '/weblink/' + weblinkId).success(function (data) {
   self.communityWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunityWeblinkManager.prototype.editCommunityWeblink = function (communityWeblinkData) {
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

 return CommunityWeblinkManager;
};

communityWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityWeblinkManager', communityWeblinkManager);