var profileSwipesSrv = function ($http, $q) {

 var ProfileSwipesSrv = function () {
  this.profileSwipes = [];
 };
 ProfileSwipesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileSwipesSrv.prototype.getProfileSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.profileSwipes = [];
  $http.get('/api/profile/swipes').success(function (data) {
   self.profileSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileSwipesSrv.prototype.getProfileSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.profile = [];
  $http.get('/api/profile/swipe').success(function (data) {
   self.profile = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileSwipesSrv.prototype.createProfileSwipe = function (profileSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/swipe/create',
   data: profileSwipeData
  }).success(function (data) {
   self.profileSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileSwipesSrv.prototype.editProfile = function (profileData) {
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
 return ProfileSwipesSrv;
};

profileSwipesSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileSwipesSrv', profileSwipesSrv);

