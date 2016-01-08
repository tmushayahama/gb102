var profileTodoManager = function ($http, $q) {

 var ProfileTodoManager = function () {
  this.profileTodos = [];
 };
 ProfileTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProfileTodoManager.prototype.getProfileTodo = function (profileId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId + '/todo/' + todoId).success(function (data) {
   self.profileTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileTodoManager.prototype.editProfileTodo = function (profileTodoData) {
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

 return ProfileTodoManager;
};
profileTodoManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileTodoManager', profileTodoManager);
