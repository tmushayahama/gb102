var questionnaireProgressManager = function ($http, $q) {

 var QuestionnaireProgressManager = function () {
  this.questionnaireProgress = [];
 };
 QuestionnaireProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 QuestionnaireProgressManager.prototype.getQuestionnaireProgress = function (questionnaireId, progressId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/progress/' + progressId).success(function (data) {
   self.questionnaireProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireProgressManager.prototype.editQuestionnaireProgress = function (questionnaireProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/progress/edit',
   data: questionnaireProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return QuestionnaireProgressManager;
};

questionnaireProgressManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireProgressManager', questionnaireProgressManager);