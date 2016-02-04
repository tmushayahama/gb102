var collaborationTimelinesManager=function($http,$q){var CollaborationTimelinesManager=function(){this.collaborationTimelines=[]};return CollaborationTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationTimelinesManager.prototype.getCollaborationTimelines=function(collaborationId){var self=this,deferred=$q.defer();return self.collaborationTimelines=[],$http.get("/api/collaboration/"+collaborationId+"/timelines").success(function(data){self.collaborationTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTimelinesManager.prototype.getCollaborationTimeline=function(collaborationId,timelineId){var self=this,deferred=$q.defer();return self.collaborationTimelines=[],$http.get("/api/collaboration/"+collaborationId+"/timeline/"+timelineId).success(function(data){self.collaborationTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTimelinesManager.prototype.createCollaborationTimeline=function(collaborationTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/timeline/create",data:collaborationTimelineData}).success(function(data){self.collaborationTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTimelinesManager.prototype.editCollaborationTimeline=function(collaborationTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/timeline/edit",data:collaborationTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationTimelinesManager};collaborationTimelinesManager.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationTimelinesManager",collaborationTimelinesManager);