var journalsSrv=function($http,$q){var JournalsSrv=function(){this.journals=[]};return JournalsSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalsSrv.prototype.getAllJournals=function(){var self=this,deferred=$q.defer();return $http.get("/api/journals/all").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalsSrv.prototype.getAppJournals=function(appName){var self=this,deferred=$q.defer();return $http.get("/api/journals/all/"+appName).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalsSrv.prototype.getMyJournals=function(){var self=this,deferred=$q.defer();return $http.get("/api/journals/mine").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalsSrv.prototype.getJournal=function(journalId,Id){var self=this,deferred=$q.defer();return self.journal=[],$http.get("/api/journal/"+journalId+"//"+Id).success(function(data){self.journal=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalsSrv.prototype.createJournal=function(journalData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/create",data:journalData}).success(function(data){self.journals.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalsSrv.prototype.editJournal=function(journalData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journaledit",data:journalData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalsSrv};journalsSrv.$inject=["$http","$q"],angular.module("app.journal").service("JournalsSrv",journalsSrv);