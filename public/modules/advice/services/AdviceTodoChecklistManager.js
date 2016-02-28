var adviceTodoChecklistSrv = function ($http, $q) {

 var AdviceTodoChecklistSrv = function () {
  this.adviceTodoChecklist = [];
 };
 AdviceTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceTodoChecklistSrv.prototype.getAdviceTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.adviceTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTodoChecklistSrv.prototype.getAdviceTodoChecklistItem = function (adviceId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/advice/' + adviceId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTodoChecklistSrv.prototype.createAdviceTodoChecklistItem = function (adviceTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: adviceTodoChecklistData
  }).success(function (data) {
   self.adviceTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTodoChecklistSrv.prototype.editAdviceTodoChecklistItem = function (adviceTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: adviceTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AdviceTodoChecklistSrv;
};

adviceTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceTodoChecklistSrv', adviceTodoChecklistSrv);