var collaborationTodoChecklistManager = function ($http, $q) {

 var CollaborationTodoChecklistManager = function () {
  this.collaborationTodoChecklist = [];
 };
 CollaborationTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationTodoChecklistManager.prototype.getCollaborationTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.collaborationTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTodoChecklistManager.prototype.getCollaborationTodoChecklistItem = function (collaborationId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTodoChecklistManager.prototype.createCollaborationTodoChecklistItem = function (collaborationTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: collaborationTodoChecklistData
  }).success(function (data) {
   self.collaborationTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTodoChecklistManager.prototype.editCollaborationTodoChecklistItem = function (collaborationTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: collaborationTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CollaborationTodoChecklistManager;
};

collaborationTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationTodoChecklistManager', collaborationTodoChecklistManager);