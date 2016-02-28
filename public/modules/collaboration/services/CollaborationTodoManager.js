var collaborationTodoSrv = function ($http, $q) {

 var CollaborationTodoSrv = function () {
  this.collaborationTodos = [];
 };
 CollaborationTodoSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationTodoSrv.prototype.getCollaborationTodo = function (collaborationId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/todo/' + todoId).success(function (data) {
   self.collaborationTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationTodoSrv.prototype.editCollaborationTodo = function (collaborationTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/todo/edit',
   data: collaborationTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CollaborationTodoSrv;
};
collaborationTodoSrv.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationTodoSrv', collaborationTodoSrv);
