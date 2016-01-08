var questionnaireTodoManager = function ($http, $q) {

 var QuestionnaireTodoManager = function () {
  this.questionnaireTodos = [];
 };
 QuestionnaireTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 QuestionnaireTodoManager.prototype.getQuestionnaireTodo = function (questionnaireId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/todo/' + todoId).success(function (data) {
   self.questionnaireTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireTodoManager.prototype.editQuestionnaireTodo = function (questionnaireTodoData) {
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

 return QuestionnaireTodoManager;
};
questionnaireTodoManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireTodoManager', questionnaireTodoManager);
