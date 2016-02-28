var questionnaireNotesSrv = function ($http, $q) {

 var QuestionnaireNotesSrv = function () {
  this.questionnaireNotes = [];
 };
 QuestionnaireNotesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireNotesSrv.prototype.getQuestionnaireNotes = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireNotes = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/notes').success(function (data) {
   self.questionnaireNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireNotesSrv.prototype.getQuestionnaireNote = function (questionnaireId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireNotes = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/note/' + noteId).success(function (data) {
   self.questionnaireNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireNotesSrv.prototype.createQuestionnaireNote = function (questionnaireNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/note/create',
   data: questionnaireNoteData
  }).success(function (data) {
   self.questionnaireNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireNotesSrv.prototype.editQuestionnaireNote = function (questionnaireNoteData) {
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


 return QuestionnaireNotesSrv;
};

questionnaireNotesSrv.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireNotesSrv', questionnaireNotesSrv);