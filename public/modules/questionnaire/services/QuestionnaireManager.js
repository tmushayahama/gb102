var questionnaireManager = function ($http, $q) {

 var QuestionnaireManager = function () {
  this.questionAnswers = [];
 };
 QuestionnaireManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireManager.prototype.getQuestionAnswers = function () {
  var self = this;
  var deferred = $q.defer();
  self.questionAnswers = [];
  $http.get('/api/questionnaire/answers').success(function (data) {
   self.questionAnswers = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireManager.prototype.getQuestionnaireQuestion = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  //self.questionnaire = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/question').success(function (data) {
   //self.questionnaire = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireManager.prototype.createQuestionAnswer = function (questionAnswerData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/answer/create',
   data: questionAnswerData
  }).success(function (data) {
   self.questionAnswer.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireManager.prototype.editQuestionnaire = function (questionnaireData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaireedit',
   data: questionnaireData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return QuestionnaireManager;
};

questionnaireManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireManager', questionnaireManager);

