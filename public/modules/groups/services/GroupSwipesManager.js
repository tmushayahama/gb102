var groupSwipesManager = function ($http, $q) {

 var GroupSwipesManager = function () {
  this.groupSwipes = [];
 };
 GroupSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupSwipesManager.prototype.getGroupSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.groupSwipes = [];
  $http.get('/api/groups/swipes').success(function (data) {
   self.groupSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GroupSwipesManager.prototype.getGroupSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.group = [];
  $http.get('/api/groups/swipe').success(function (data) {
   self.group = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupSwipesManager.prototype.createGroupSwipe = function (groupSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/groups/swipe/create',
   data: groupSwipeData
  }).success(function (data) {
   self.groupSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupSwipesManager.prototype.editGroup = function (groupData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/groupedit',
   data: groupData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return GroupSwipesManager;
};

groupSwipesManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupSwipesManager', groupSwipesManager);

