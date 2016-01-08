var swipeTodoManager = function ($http, $q) {

 var SwipeTodoManager = function () {
  this.swipeTodos = [];
 };
 SwipeTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SwipeTodoManager.prototype.getSwipeTodo = function (swipeId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/swipe/' + swipeId + '/todo/' + todoId).success(function (data) {
   self.swipeTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SwipeTodoManager.prototype.editSwipeTodo = function (swipeTodoData) {
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

 return SwipeTodoManager;
};
swipeTodoManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeTodoManager', swipeTodoManager);
