var exploreTodosManager = function ($http, $q) {

 var ExploreTodosManager = function () {
  this.exploreTodos = [];
 };
 ExploreTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreTodosManager.prototype.getExploreTodos = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreTodos = [];
  $http.get('/api/explore/' + exploreId + '/todos').success(function (data) {
   self.exploreTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTodosManager.prototype.getExploreTodo = function (exploreId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreTodos = [];
  $http.get('/api/explore/' + exploreId + '/todo/' + todoId).success(function (data) {
   self.exploreTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTodosManager.prototype.createExploreTodo = function (exploreTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/todo/create',
   data: exploreTodoData
  }).success(function (data) {
   self.exploreTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTodosManager.prototype.editExploreTodo = function (exploreTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/todo/edit',
   data: exploreTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreTodosManager;
};

exploreTodosManager.$inject = ['$http', '$q'];

angular.module('app.explores').service('ExploreTodosManager', exploreTodosManager);