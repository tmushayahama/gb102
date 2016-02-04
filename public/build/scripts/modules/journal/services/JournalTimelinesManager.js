var journalTimelinesManager=function($http,$q){var JournalTimelinesManager=function(){this.journalTimelines=[]};return JournalTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},JournalTimelinesManager.prototype.getJournalTimelines=function(journalId){var self=this,deferred=$q.defer();return self.journalTimelines=[],$http.get("/api/journal/"+journalId+"/timelines").success(function(data){self.journalTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTimelinesManager.prototype.getJournalTimeline=function(journalId,timelineId){var self=this,deferred=$q.defer();return self.journalTimelines=[],$http.get("/api/journal/"+journalId+"/timeline/"+timelineId).success(function(data){self.journalTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTimelinesManager.prototype.createJournalTimeline=function(journalTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/timeline/create",data:journalTimelineData}).success(function(data){self.journalTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTimelinesManager.prototype.editJournalTimeline=function(journalTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/journal/timeline/edit",data:journalTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},JournalTimelinesManager};journalTimelinesManager.$inject=["$http","$q"],angular.module("app.journal").service("JournalTimelinesManager",journalTimelinesManager);