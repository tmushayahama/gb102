var questionnaireWeblinkManager = function ($http, $q) {

 var QuestionnaireWeblinkManager = function () {
  this.questionnaireWeblinks = [];
 };
 QuestionnaireWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 QuestionnaireWeblinkManager.prototype.getQuestionnaireWeblink = function (questionnaireId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/weblink/' + weblinkId).success(function (data) {
   self.questionnaireWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireWeblinkManager.prototype.editQuestionnaireWeblink = function (questionnaireWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/weblink/edit',
   data: questionnaireWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return QuestionnaireWeblinkManager;
};

questionnaireWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireWeblinkManager', questionnaireWeblinkManager);