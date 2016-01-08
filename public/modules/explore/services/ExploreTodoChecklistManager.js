var exploreTodoChecklistManager = function ($http, $q) {

 var ExploreTodoChecklistManager = function () {
  this.exploreTodoChecklist = [];
 };
 ExploreTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreTodoChecklistManager.prototype.getExploreTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.exploreTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTodoChecklistManager.prototype.getExploreTodoChecklistItem = function (exploreId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTodoChecklistManager.prototype.createExploreTodoChecklistItem = function (exploreTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: exploreTodoChecklistData
  }).success(function (data) {
   self.exploreTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreTodoChecklistManager.prototype.editExploreTodoChecklistItem = function (exploreTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: exploreTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreTodoChecklistManager;
};

exploreTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreTodoChecklistManager', exploreTodoChecklistManager);