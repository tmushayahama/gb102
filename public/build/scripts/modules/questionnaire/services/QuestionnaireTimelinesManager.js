var questionnaireTimelinesManager=function($http,$q){var QuestionnaireTimelinesManager=function(){this.questionnaireTimelines=[]};return QuestionnaireTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},QuestionnaireTimelinesManager.prototype.getQuestionnaireTimelines=function(questionnaireId){var self=this,deferred=$q.defer();return self.questionnaireTimelines=[],$http.get("/api/questionnaire/"+questionnaireId+"/timelines").success(function(data){self.questionnaireTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTimelinesManager.prototype.getQuestionnaireTimeline=function(questionnaireId,timelineId){var self=this,deferred=$q.defer();return self.questionnaireTimelines=[],$http.get("/api/questionnaire/"+questionnaireId+"/timeline/"+timelineId).success(function(data){self.questionnaireTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTimelinesManager.prototype.createQuestionnaireTimeline=function(questionnaireTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/questionnaire/timeline/create",data:questionnaireTimelineData}).success(function(data){self.questionnaireTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTimelinesManager.prototype.editQuestionnaireTimeline=function(questionnaireTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/questionnaire/timeline/edit",data:questionnaireTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTimelinesManager};questionnaireTimelinesManager.$inject=["$http","$q"],angular.module("app.questionnaire").service("QuestionnaireTimelinesManager",questionnaireTimelinesManager);