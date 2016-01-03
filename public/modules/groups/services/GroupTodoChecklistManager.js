var groupTodoChecklistManager = function ($http, $q) {

 var GroupTodoChecklistManager = function () {
  this.groupTodoChecklist = [];
 };
 GroupTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupTodoChecklistManager.prototype.getGroupTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.groupTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.groupTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTodoChecklistManager.prototype.getGroupTodoChecklistItem = function (groupId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/group/' + groupId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTodoChecklistManager.prototype.createGroupTodoChecklistItem = function (groupTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: groupTodoChecklistData
  }).success(function (data) {
   self.groupTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTodoChecklistManager.prototype.editGroupTodoChecklistItem = function (groupTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: groupTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GroupTodoChecklistManager;
};

groupTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupTodoChecklistManager', groupTodoChecklistManager);