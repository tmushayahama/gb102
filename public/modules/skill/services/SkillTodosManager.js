var skillTodosManager = function ($http, $q) {

 var SkillTodosManager = function () {
  this.skillTodos = [];
 };
 SkillTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillTodosManager.prototype.getSkillTodos = function (skillId) {
  var self = this;
  var deferred = $q.defer();
  self.skillTodos = [];
  $http.get('/api/skill/' + skillId + '/todos').success(function (data) {
   self.skillTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillTodosManager.prototype.getSkillTodo = function (skillId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.skillTodos = [];
  $http.get('/api/skill/' + skillId + '/todo/' + todoId).success(function (data) {
   self.skillTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillTodosManager.prototype.createSkillTodo = function (skillTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/todo/create',
   data: skillTodoData
  }).success(function (data) {
   self.skillTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillTodosManager.prototype.editSkillTodo = function (skillTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/todo/edit',
   data: skillTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SkillTodosManager;
};

skillTodosManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillTodosManager', skillTodosManager);