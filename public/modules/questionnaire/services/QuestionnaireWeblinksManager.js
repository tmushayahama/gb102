var questionnaireWeblinksSrv = function ($http, $q) {

 var QuestionnaireWeblinksSrv = function () {
  this.questionnaireWeblinks = [];
 };
 QuestionnaireWeblinksSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireWeblinksSrv.prototype.getQuestionnaireWeblinks = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireWeblinks = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/weblinks').success(function (data) {
   self.questionnaireWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireWeblinksSrv.prototype.getQuestionnaireWeblink = function (questionnaireId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireWeblinks = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/weblink/' + weblinkId).success(function (data) {
   self.questionnaireWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireWeblinksSrv.prototype.createQuestionnaireWeblink = function (questionnaireWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/weblink/create',
   data: questionnaireWeblinkData
  }).success(function (data) {
   self.questionnaireWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireWeblinksSrv.prototype.editQuestionnaireWeblink = function (questionnaireWeblinkData) {
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


 return QuestionnaireWeblinksSrv;
};


questionnaireWeblinksSrv.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireWeblinksSrv', questionnaireWeblinksSrv);