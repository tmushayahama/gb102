var hobbyTodoChecklistManager = function ($http, $q) {

 var HobbyTodoChecklistManager = function () {
  this.hobbyTodoChecklist = [];
 };
 HobbyTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 HobbyTodoChecklistManager.prototype.getHobbyTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.hobbyTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.hobbyTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyTodoChecklistManager.prototype.getHobbyTodoChecklistItem = function (hobbyId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/hobby/' + hobbyId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyTodoChecklistManager.prototype.createHobbyTodoChecklistItem = function (hobbyTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: hobbyTodoChecklistData
  }).success(function (data) {
   self.hobbyTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyTodoChecklistManager.prototype.editHobbyTodoChecklistItem = function (hobbyTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: hobbyTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return HobbyTodoChecklistManager;
};

hobbyTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbyTodoChecklistManager', hobbyTodoChecklistManager);