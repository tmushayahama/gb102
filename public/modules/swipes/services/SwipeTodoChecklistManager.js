var swipeTodoChecklistManager = function ($http, $q) {

 var SwipeTodoChecklistManager = function () {
  this.swipeTodoChecklist = [];
 };
 SwipeTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeTodoChecklistManager.prototype.getSwipeTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.swipeTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTodoChecklistManager.prototype.getSwipeTodoChecklistItem = function (swipeId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/swipe/' + swipeId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTodoChecklistManager.prototype.createSwipeTodoChecklistItem = function (swipeTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: swipeTodoChecklistData
  }).success(function (data) {
   self.swipeTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeTodoChecklistManager.prototype.editSwipeTodoChecklistItem = function (swipeTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: swipeTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SwipeTodoChecklistManager;
};

swipeTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.swipes').service('SwipeTodoChecklistManager', swipeTodoChecklistManager);