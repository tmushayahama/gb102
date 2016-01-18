var profileQuestionnaireManager = function ($http, $q) {

 var ProfileQuestionnaireManager = function () {
  this.questionnaires = [];
 };
 ProfileQuestionnaireManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileQuestionnaireManager.prototype.getAllQuestionnaires = function () {
  var self = this;
  var deferred = $q.defer();
  self.questionnaires = [];
  $http.get('/api/questionnaires/all').success(function (data) {
   self.questionnaires = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileQuestionnaireManager.prototype.getMyQuestionnaires = function () {
  var self = this;
  var deferred = $q.defer();
  self.questionnaires = [];
  $http.get('/api/questionnaires/mine').success(function (data) {
   self.questionnaires = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileQuestionnaireManager.prototype.getQuestionnaire = function (questionnaireId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaire = [];
  $http.get('/api/questionnaire/' + questionnaireId + '//' + Id).success(function (data) {
   self.questionnaire = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileQuestionnaireManager.prototype.createQuestionnaire = function (questionnaireData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/create',
   data: questionnaireData
  }).success(function (data) {
   self.questionnaires.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileQuestionnaireManager.prototype.editQuestionnaire = function (questionnaireData) {
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
 return ProfileQuestionnaireManager;
};

profileQuestionnaireManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('ProfileQuestionnaireManager', profileQuestionnaireManager);

