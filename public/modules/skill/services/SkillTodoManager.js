var skillTodoSrv = function ($http, $q) {

 var SkillTodoSrv = function () {
  this.skillTodos = [];
 };
 SkillTodoSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SkillTodoSrv.prototype.getSkillTodo = function (skillId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId + '/todo/' + todoId).success(function (data) {
   self.skillTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillTodoSrv.prototype.editSkillTodo = function (skillTodoData) {
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

 return SkillTodoSrv;
};
skillTodoSrv.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillTodoSrv', skillTodoSrv);
