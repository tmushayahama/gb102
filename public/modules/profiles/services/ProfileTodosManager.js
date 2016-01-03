var profileTodosManager = function ($http, $q) {

 var ProfileTodosManager = function () {
  this.profileTodos = [];
 };
 ProfileTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileTodosManager.prototype.getProfileTodos = function (profileId) {
  var self = this;
  var deferred = $q.defer();
  self.profileTodos = [];
  $http.get('/api/profile/' + profileId + '/todos').success(function (data) {
   self.profileTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTodosManager.prototype.getProfileTodo = function (profileId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.profileTodos = [];
  $http.get('/api/profile/' + profileId + '/todo/' + todoId).success(function (data) {
   self.profileTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTodosManager.prototype.createProfileTodo = function (profileTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/todo/create',
   data: profileTodoData
  }).success(function (data) {
   self.profileTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTodosManager.prototype.editProfileTodo = function (profileTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/todo/edit',
   data: profileTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProfileTodosManager;
};

profileTodosManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileTodosManager', profileTodosManager);