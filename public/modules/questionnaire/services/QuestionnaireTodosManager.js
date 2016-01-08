var questionnaireTodosManager = function ($http, $q) {

 var QuestionnaireTodosManager = function () {
  this.questionnaireTodos = [];
 };
 QuestionnaireTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireTodosManager.prototype.getQuestionnaireTodos = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireTodos = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/todos').success(function (data) {
   self.questionnaireTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTodosManager.prototype.getQuestionnaireTodo = function (questionnaireId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireTodos = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/todo/' + todoId).success(function (data) {
   self.questionnaireTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTodosManager.prototype.createQuestionnaireTodo = function (questionnaireTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/todo/create',
   data: questionnaireTodoData
  }).success(function (data) {
   self.questionnaireTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTodosManager.prototype.editQuestionnaireTodo = function (questionnaireTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/todo/edit',
   data: questionnaireTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return QuestionnaireTodosManager;
};

questionnaireTodosManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireTodosManager', questionnaireTodosManager);