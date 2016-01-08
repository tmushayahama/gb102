var questionnaireManager=function($http,$q){var QuestionnaireManager=function(){this.questionnaires=[]};return QuestionnaireManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},QuestionnaireManager.prototype.getQuestionnaires=function(){var self=this,deferred=$q.defer();return self.questionnaires=[],$http.get("/api/questionnaires/history").success(function(data){self.questionnaires=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireManager.prototype.getQuestionnaire=function(){var self=this,deferred=$q.defer();return $http.get("/api/questionnaires/questionnaire").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireManager.prototype.createQuestionnaire=function(questionnaireData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/questionnaires/create",data:questionnaireData}).success(function(data){self.questionnaire.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireManager.prototype.editQuestionnaire=function(questionnaireData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/questionnaireedit",data:questionnaireData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireManager};questionnaireManager.$inject=["$http","$q"],angular.module("app.questionnaire").service("QuestionnaireManager",questionnaireManager);