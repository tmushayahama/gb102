var questionnaireNoteSrv = function ($http, $q) {

 var QuestionnaireNoteSrv = function () {
  this.questionnaireNotes = [];
 };
 QuestionnaireNoteSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 QuestionnaireNoteSrv.prototype.getQuestionnaireNote = function (questionnaireId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/note/' + noteId).success(function (data) {
   self.questionnaireNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireNoteSrv.prototype.editQuestionnaireNote = function (questionnaireNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/note/edit',
   data: questionnaireNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return QuestionnaireNoteSrv;
};

questionnaireNoteSrv.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireNoteSrv', questionnaireNoteSrv);