var questionnaireSrv = function ($http, $q) {

 var QuestionnaireSrv = function () {
  this.questionnaire = [];
 };
 QuestionnaireSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireSrv.prototype.getQuestionnaire = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId).success(function (data) {
   self.questionnaire = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireSrv.prototype.editQuestionnaire = function (questionnaireData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/edit',
   data: questionnaireData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return QuestionnaireSrv;
};

questionnaireSrv.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireSrv', questionnaireSrv);
