var journalTodosSrv=function($http,$q){var JournalTodosSrv=function(){this.journalTodos=[]};return JournalTodosSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalTodosSrv.prototype.getJournalTodos=function(journalId){var self=this,deferred=$q.defer();return self.journalTodos=[],$http.get("/api/journal/"+journalId+"/todos").success(function(data){self.journalTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTodosSrv.prototype.getJournalTodo=function(journalId,todoId){var self=this,deferred=$q.defer();return self.journalTodos=[],$http.get("/api/journal/"+journalId+"/todo/"+todoId).success(function(data){self.journalTodos=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTodosSrv.prototype.createJournalTodo=function(journalTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/todo/create",data:journalTodoData}).success(function(data){self.journalTodos.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTodosSrv.prototype.editJournalTodo=function(journalTodoData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/todo/edit",data:journalTodoData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTodosSrv};journalTodosSrv.$inject=["$http","$q"],angular.module("app.journal").service("JournalTodosSrv",journalTodosSrv);