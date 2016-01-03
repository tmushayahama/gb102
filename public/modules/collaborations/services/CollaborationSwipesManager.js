var collaborationSwipesManager = function ($http, $q) {

 var CollaborationSwipesManager = function () {
  this.collaborationSwipes = [];
 };
 CollaborationSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationSwipesManager.prototype.getCollaborationSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.collaborationSwipes = [];
  $http.get('/api/collaborations/swipes').success(function (data) {
   self.collaborationSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationSwipesManager.prototype.getCollaborationSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.collaboration = [];
  $http.get('/api/collaborations/swipe').success(function (data) {
   self.collaboration = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationSwipesManager.prototype.createCollaborationSwipe = function (collaborationSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaborations/swipe/create',
   data: collaborationSwipeData
  }).success(function (data) {
   self.collaborationSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationSwipesManager.prototype.editCollaboration = function (collaborationData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaborationedit',
   data: collaborationData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return CollaborationSwipesManager;
};

collaborationSwipesManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationSwipesManager', collaborationSwipesManager);

