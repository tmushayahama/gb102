var questionnaireCommentsManager = function ($http, $q) {

 var QuestionnaireCommentsManager = function () {
  this.questionnaireComments = [];
 };
 QuestionnaireCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireCommentsManager.prototype.getQuestionnaireComments = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireComments = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/comments').success(function (data) {
   self.questionnaireComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireCommentsManager.prototype.getQuestionnaireComment = function (questionnaireId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireComments = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/comment/' + commentId).success(function (data) {
   self.questionnaireComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireCommentsManager.prototype.createQuestionnaireComment = function (questionnaireCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/comment/create',
   data: questionnaireCommentData
  }).success(function (data) {
   self.questionnaireComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireCommentsManager.prototype.editQuestionnaireComment = function (questionnaireCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/comment/edit',
   data: questionnaireCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return QuestionnaireCommentsManager;
};

questionnaireCommentsManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireCommentsManager', questionnaireCommentsManager);
