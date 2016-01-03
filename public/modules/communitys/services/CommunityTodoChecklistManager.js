var communityTodoChecklistManager = function ($http, $q) {

 var CommunityTodoChecklistManager = function () {
  this.communityTodoChecklist = [];
 };
 CommunityTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunityTodoChecklistManager.prototype.getCommunityTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.communityTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.communityTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTodoChecklistManager.prototype.getCommunityTodoChecklistItem = function (communityId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTodoChecklistManager.prototype.createCommunityTodoChecklistItem = function (communityTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: communityTodoChecklistData
  }).success(function (data) {
   self.communityTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTodoChecklistManager.prototype.editCommunityTodoChecklistItem = function (communityTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: communityTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CommunityTodoChecklistManager;
};

communityTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityTodoChecklistManager', communityTodoChecklistManager);