var journalNotesSrv=function($http,$q){var JournalNotesSrv=function(){this.journalNotes=[]};return JournalNotesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalNotesSrv.prototype.getJournalNotes=function(journalId){var self=this,deferred=$q.defer();return self.journalNotes=[],$http.get("/api/journal/"+journalId+"/notes").success(function(data){self.journalNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalNotesSrv.prototype.getJournalNote=function(journalId,noteId){var self=this,deferred=$q.defer();return self.journalNotes=[],$http.get("/api/journal/"+journalId+"/note/"+noteId).success(function(data){self.journalNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalNotesSrv.prototype.createJournalNote=function(journalNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/note/create",data:journalNoteData}).success(function(data){self.journalNotes.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalNotesSrv.prototype.editJournalNote=function(journalNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/note/edit",data:journalNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalNotesSrv};journalNotesSrv.$inject=["$http","$q"],angular.module("app.journal").service("JournalNotesSrv",journalNotesSrv);