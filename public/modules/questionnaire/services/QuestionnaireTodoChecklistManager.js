var questionnaireTodoChecklistSrv = function ($http, $q) {

 var QuestionnaireTodoChecklistSrv = function () {
  this.questionnaireTodoChecklist = [];
 };
 QuestionnaireTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireTodoChecklistSrv.prototype.getQuestionnaireTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.questionnaireTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTodoChecklistSrv.prototype.getQuestionnaireTodoChecklistItem = function (questionnaireId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTodoChecklistSrv.prototype.createQuestionnaireTodoChecklistItem = function (questionnaireTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: questionnaireTodoChecklistData
  }).success(function (data) {
   self.questionnaireTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTodoChecklistSrv.prototype.editQuestionnaireTodoChecklistItem = function (questionnaireTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: questionnaireTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return QuestionnaireTodoChecklistSrv;
};

questionnaireTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireTodoChecklistSrv', questionnaireTodoChecklistSrv);