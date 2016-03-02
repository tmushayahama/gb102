var journalProgressSrv=function($http,$q){var JournalProgressSrv=function(){this.journalProgress=[]};return JournalProgressSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalProgressSrv.prototype.getJournalProgress=function(journalId,progressId){var self=this,deferred=$q.defer();return $http.get("/api/journal/"+journalId+"/progress/"+progressId).success(function(data){self.journalProgress=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalProgressSrv.prototype.editJournalProgress=function(journalProgressData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/progress/edit",data:journalProgressData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalProgressSrv};journalProgressSrv.$inject=["$http","$q"],angular.module("app.journal").service("JournalProgressSrv",journalProgressSrv);