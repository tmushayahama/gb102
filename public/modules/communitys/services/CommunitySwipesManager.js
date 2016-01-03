var communitySwipesManager = function ($http, $q) {

 var CommunitySwipesManager = function () {
  this.communitySwipes = [];
 };
 CommunitySwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunitySwipesManager.prototype.getCommunitySwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.communitySwipes = [];
  $http.get('/api/communitys/swipes').success(function (data) {
   self.communitySwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunitySwipesManager.prototype.getCommunitySwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.community = [];
  $http.get('/api/communitys/swipe').success(function (data) {
   self.community = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunitySwipesManager.prototype.createCommunitySwipe = function (communitySwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/communitys/swipe/create',
   data: communitySwipeData
  }).success(function (data) {
   self.communitySwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunitySwipesManager.prototype.editCommunity = function (communityData) {
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
 return CommunitySwipesManager;
};

communitySwipesManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunitySwipesManager', communitySwipesManager);

