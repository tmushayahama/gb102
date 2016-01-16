var questionnaireTodosManager=function($http,$q){var QuestionnaireTodosManager=function(){this.questionnaireTodos=[]};return QuestionnaireTodosManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},QuestionnaireTodosManager.prototype.getQuestionnaireTodos=function(questionnaireId){var self=this,deferred=$q.defer();return self.questionnaireTodos=[],$http.get("/api/questionnaire/"+questionnaireId+"/todos").success(function(data){self.questionnaireTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTodosManager.prototype.getQuestionnaireTodo=function(questionnaireId,todoId){var self=this,deferred=$q.defer();return self.questionnaireTodos=[],$http.get("/api/questionnaire/"+questionnaireId+"/todo/"+todoId).success(function(data){self.questionnaireTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTodosManager.prototype.createQuestionnaireTodo=function(questionnaireTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/questionnaire/todo/create",data:questionnaireTodoData}).success(function(data){self.questionnaireTodos.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTodosManager.prototype.editQuestionnaireTodo=function(questionnaireTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/questionnaire/todo/edit",data:questionnaireTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},QuestionnaireTodosManager};questionnaireTodosManager.$inject=["$http","$q"],angular.module("app.questionnaire").service("QuestionnaireTodosManager",questionnaireTodosManager);