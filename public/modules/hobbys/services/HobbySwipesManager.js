var hobbySwipesManager = function ($http, $q) {

 var HobbySwipesManager = function () {
  this.hobbySwipes = [];
 };
 HobbySwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 HobbySwipesManager.prototype.getHobbySwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.hobbySwipes = [];
  $http.get('/api/hobbys/swipes').success(function (data) {
   self.hobbySwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 HobbySwipesManager.prototype.getHobbySwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.hobby = [];
  $http.get('/api/hobbys/swipe').success(function (data) {
   self.hobby = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbySwipesManager.prototype.createHobbySwipe = function (hobbySwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobbys/swipe/create',
   data: hobbySwipeData
  }).success(function (data) {
   self.hobbySwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbySwipesManager.prototype.editHobby = function (hobbyData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobbyedit',
   data: hobbyData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return HobbySwipesManager;
};

hobbySwipesManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbySwipesManager', hobbySwipesManager);

