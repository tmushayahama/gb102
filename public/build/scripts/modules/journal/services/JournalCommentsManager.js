var journalCommentsManager=function($http,$q){var JournalCommentsManager=function(){this.journalComments=[]};return JournalCommentsManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalCommentsManager.prototype.getJournalComments=function(journalId){var self=this,deferred=$q.defer();return self.journalComments=[],$http.get("/api/journal/"+journalId+"/comments").success(function(data){self.journalComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalCommentsManager.prototype.getJournalComment=function(journalId,commentId){var self=this,deferred=$q.defer();return self.journalComments=[],$http.get("/api/journal/"+journalId+"/comment/"+commentId).success(function(data){self.journalComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalCommentsManager.prototype.createJournalComment=function(journalCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/comment/create",data:journalCommentData}).success(function(data){self.journalComments.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalCommentsManager.prototype.editJournalComment=function(journalCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/comment/edit",data:journalCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalCommentsManager};journalCommentsManager.$inject=["$http","$q"],angular.module("app.journal").service("JournalCommentsManager",journalCommentsManager);