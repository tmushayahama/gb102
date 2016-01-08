var questionnaireTimelineManager = function ($http, $q) {

 var QuestionnaireTimelineManager = function () {
  this.questionnaireTimelines = [];
 };
 QuestionnaireTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 QuestionnaireTimelineManager.prototype.getQuestionnaireTimeline = function (questionnaireId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/questionnaire/' + questionnaireId + '/timeline/' + timelineId).success(function (data) {
   self.questionnaireTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 QuestionnaireTimelineManager.prototype.editQuestionnaireTimeline = function (questionnaireTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/timeline/edit',
   data: questionnaireTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return QuestionnaireTimelineManager;
};

questionnaireTimelineManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireTimelineManager', questionnaireTimelineManager);