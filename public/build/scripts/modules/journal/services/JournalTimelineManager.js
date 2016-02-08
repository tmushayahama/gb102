var journalTimelineManager=function($http,$q){var JournalTimelineManager=function(){this.journalTimelines=[]};return JournalTimelineManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalTimelineManager.prototype.getJournalTimeline=function(journalId,timelineId){var self=this,deferred=$q.defer();return $http.get("/api/journal/"+journalId+"/timeline/"+timelineId).success(function(data){self.journalTimeline=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTimelineManager.prototype.editJournalTimeline=function(journalTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/timeline/edit",data:journalTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTimelineManager};journalTimelineManager.$inject=["$http","$q"],angular.module("app.journal").service("JournalTimelineManager",journalTimelineManager);