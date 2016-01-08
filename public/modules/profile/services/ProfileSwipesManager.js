var profileSwipesManager = function ($http, $q) {

 var ProfileSwipesManager = function () {
  this.profileSwipes = [];
 };
 ProfileSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileSwipesManager.prototype.getProfileSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.profileSwipes = [];
  $http.get('/api/profiles/swipes').success(function (data) {
   self.profileSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileSwipesManager.prototype.getProfileSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.profile = [];
  $http.get('/api/profiles/swipe').success(function (data) {
   self.profile = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileSwipesManager.prototype.createProfileSwipe = function (profileSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profiles/swipe/create',
   data: profileSwipeData
  }).success(function (data) {
   self.profileSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileSwipesManager.prototype.editProfile = function (profileData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profileedit',
   data: profileData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return ProfileSwipesManager;
};

profileSwipesManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileSwipesManager', profileSwipesManager);

