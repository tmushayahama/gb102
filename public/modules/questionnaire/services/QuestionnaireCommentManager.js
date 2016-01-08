var questionnaireCommentManager = function ($http, $q) {

 var QuestionnaireCommentManager = function () {
  this.questionnaireComments = [];
 };
 QuestionnaireCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 QuestionnaireCommentManager.prototype.getQuestionnaireComment = function (questionnaireId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/comment/' + commentId).success(function (data) {
   self.questionnaireComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireCommentManager.prototype.editQuestionnaireComment = function (questionnaireCommentData) {
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

 return QuestionnaireCommentManager;
};

questionnaireCommentManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireCommentManager', questionnaireCommentManager);
