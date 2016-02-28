var questionSrv = function ($http, $q) {

 var QuestionSrv = function () {
  this.question = [];
 };
 QuestionSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionSrv.prototype.getQuestion = function (questionId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/question/' + questionId).success(function (data) {
   self.question = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionSrv.prototype.editQuestion = function (questionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/question/edit',
   data: questionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return QuestionSrv;
};

questionSrv.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionSrv', questionSrv);
