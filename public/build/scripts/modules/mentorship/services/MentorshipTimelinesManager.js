var mentorshipTimelinesManager=function($http,$q){var MentorshipTimelinesManager=function(){this.mentorshipTimelines=[]};return MentorshipTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},MentorshipTimelinesManager.prototype.getMentorshipTimelines=function(mentorshipId){var self=this,deferred=$q.defer();return self.mentorshipTimelines=[],$http.get("/api/mentorship/"+mentorshipId+"/timelines").success(function(data){self.mentorshipTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipTimelinesManager.prototype.getMentorshipTimeline=function(mentorshipId,timelineId){var self=this,deferred=$q.defer();return self.mentorshipTimelines=[],$http.get("/api/mentorship/"+mentorshipId+"/timeline/"+timelineId).success(function(data){self.mentorshipTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipTimelinesManager.prototype.createMentorshipTimeline=function(mentorshipTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/mentorship/timeline/create",data:mentorshipTimelineData}).success(function(data){self.mentorshipTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipTimelinesManager.prototype.editMentorshipTimeline=function(mentorshipTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/mentorship/timeline/edit",data:mentorshipTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},MentorshipTimelinesManager};mentorshipTimelinesManager.$inject=["$http","$q"],angular.module("app.mentorship").service("MentorshipTimelinesManager",mentorshipTimelinesManager);