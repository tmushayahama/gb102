var explorerTodoChecklistSrv = function ($http, $q) {

 var ExplorerTodoChecklistSrv = function () {
  this.explorerTodoChecklist = [];
 };
 ExplorerTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerTodoChecklistSrv.prototype.getExplorerTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.explorerTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerTodoChecklistSrv.prototype.getExplorerTodoChecklistItem = function (explorerId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerTodoChecklistSrv.prototype.createExplorerTodoChecklistItem = function (explorerTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: explorerTodoChecklistData
  }).success(function (data) {
   self.explorerTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerTodoChecklistSrv.prototype.editExplorerTodoChecklistItem = function (explorerTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: explorerTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerTodoChecklistSrv;
};

explorerTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerTodoChecklistSrv', explorerTodoChecklistSrv);