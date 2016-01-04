var exploreTodoManager = function ($http, $q) {

 var ExploreTodoManager = function () {
  this.exploreTodos = [];
 };
 ExploreTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExploreTodoManager.prototype.getExploreTodo = function (exploreId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/todo/' + todoId).success(function (data) {
   self.exploreTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreTodoManager.prototype.editExploreTodo = function (exploreTodoData) {
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

 return ExploreTodoManager;
};
exploreTodoManager.$inject = ['$http', '$q'];

angular.module('app.explores').service('ExploreTodoManager', exploreTodoManager);
