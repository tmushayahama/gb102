var swipeTodosManager = function ($http, $q) {

 var SwipeTodosManager = function () {
  this.swipeTodos = [];
 };
 SwipeTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeTodosManager.prototype.getSwipeTodos = function (swipeId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeTodos = [];
  $http.get('/api/swipe/' + swipeId + '/todos').success(function (data) {
   self.swipeTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTodosManager.prototype.getSwipeTodo = function (swipeId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeTodos = [];
  $http.get('/api/swipe/' + swipeId + '/todo/' + todoId).success(function (data) {
   self.swipeTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTodosManager.prototype.createSwipeTodo = function (swipeTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/todo/create',
   data: swipeTodoData
  }).success(function (data) {
   self.swipeTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTodosManager.prototype.editSwipeTodo = function (swipeTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/todo/edit',
   data: swipeTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SwipeTodosManager;
};

swipeTodosManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeTodosManager', swipeTodosManager);