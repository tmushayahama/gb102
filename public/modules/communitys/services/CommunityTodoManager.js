var communityTodoManager = function ($http, $q) {

 var CommunityTodoManager = function () {
  this.communityTodos = [];
 };
 CommunityTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CommunityTodoManager.prototype.getCommunityTodo = function (communityId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId + '/todo/' + todoId).success(function (data) {
   self.communityTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunityTodoManager.prototype.editCommunityTodo = function (communityTodoData) {
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

 return CommunityTodoManager;
};
communityTodoManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityTodoManager', communityTodoManager);
