var communityTodosManager = function ($http, $q) {

 var CommunityTodosManager = function () {
  this.communityTodos = [];
 };
 CommunityTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunityTodosManager.prototype.getCommunityTodos = function (communityId) {
  var self = this;
  var deferred = $q.defer();
  self.communityTodos = [];
  $http.get('/api/community/' + communityId + '/todos').success(function (data) {
   self.communityTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTodosManager.prototype.getCommunityTodo = function (communityId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.communityTodos = [];
  $http.get('/api/community/' + communityId + '/todo/' + todoId).success(function (data) {
   self.communityTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTodosManager.prototype.createCommunityTodo = function (communityTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/todo/create',
   data: communityTodoData
  }).success(function (data) {
   self.communityTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTodosManager.prototype.editCommunityTodo = function (communityTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/todo/edit',
   data: communityTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CommunityTodosManager;
};

communityTodosManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityTodosManager', communityTodosManager);