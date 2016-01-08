var questionnaireManager = function ($http, $q) {

 var QuestionnaireManager = function () {
  this.questionnaires = [];
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

 QuestionnaireManager.prototype.getQuestionnaires = function () {
  var self = this;
  var deferred = $q.defer();
  self.questionnaires = [];
  $http.get('/api/questionnaires/history').success(function (data) {
   self.questionnaires = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireManager.prototype.getQuestionnaire = function () {
  var self = this;
  var deferred = $q.defer();
  //self.questionnaire = [];
  $http.get('/api/questionnaires/questionnaire').success(function (data) {
   //self.questionnaire = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireManager.prototype.createQuestionnaire = function (questionnaireData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaires/create',
   data: questionnaireData
  }).success(function (data) {
   self.questionnaire.unshift(data);
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

