var teachTodoChecklistManager = function ($http, $q) {

 var TeachTodoChecklistManager = function () {
  this.teachTodoChecklist = [];
 };
 TeachTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachTodoChecklistManager.prototype.getTeachTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.teachTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTodoChecklistManager.prototype.getTeachTodoChecklistItem = function (teachId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTodoChecklistManager.prototype.createTeachTodoChecklistItem = function (teachTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: teachTodoChecklistData
  }).success(function (data) {
   self.teachTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTodoChecklistManager.prototype.editTeachTodoChecklistItem = function (teachTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: teachTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return TeachTodoChecklistManager;
};

teachTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachTodoChecklistManager', teachTodoChecklistManager);