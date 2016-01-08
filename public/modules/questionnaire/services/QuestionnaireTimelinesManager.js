var questionnaireTimelinesManager = function ($http, $q) {

 var QuestionnaireTimelinesManager = function () {
  this.questionnaireTimelines = [];
 };
 QuestionnaireTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 QuestionnaireTimelinesManager.prototype.getQuestionnaireTimelines = function (questionnaireId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireTimelines = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/timelines').success(function (data) {
   self.questionnaireTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTimelinesManager.prototype.getQuestionnaireTimeline = function (questionnaireId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.questionnaireTimelines = [];
  $http.get('/api/questionnaire/' + questionnaireId + '/timeline/' + timelineId).success(function (data) {
   self.questionnaireTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTimelinesManager.prototype.createQuestionnaireTimeline = function (questionnaireTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/questionnaire/timeline/create',
   data: questionnaireTimelineData
  }).success(function (data) {
   self.questionnaireTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 QuestionnaireTimelinesManager.prototype.editQuestionnaireTimeline = function (questionnaireTimelineData) {
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


 return QuestionnaireTimelinesManager;
};

questionnaireTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.questionnaire').service('QuestionnaireTimelinesManager', questionnaireTimelinesManager);
