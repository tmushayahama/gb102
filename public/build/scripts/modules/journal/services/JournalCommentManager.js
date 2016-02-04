var journalCommentManager=function($http,$q){var JournalCommentManager=function(){this.journalComments=[]};return JournalCommentManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalCommentManager.prototype.getJournalComment=function(journalId,commentId){var self=this,deferred=$q.defer();return $http.get("/api/journal/"+journalId+"/comment/"+commentId).success(function(data){self.journalComment=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalCommentManager.prototype.editJournalComment=function(journalCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/comment/edit",data:journalCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalCommentManager};journalCommentManager.$inject=["$http","$q"],angular.module("app.journal").service("JournalCommentManager",journalCommentManager);