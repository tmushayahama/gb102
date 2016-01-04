var communityTimelineManager=function($http,$q){var CommunityTimelineManager=function(){this.communityTimelines=[]};return CommunityTimelineManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CommunityTimelineManager.prototype.getCommunityTimeline=function(communityId,timelineId){var self=this,deferred=$q.defer();return $http.get("/api/community/"+communityId+"/timeline/"+timelineId).success(function(data){self.communityTimeline=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityTimelineManager.prototype.editCommunityTimeline=function(communityTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/community/timeline/edit",data:communityTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityTimelineManager};communityTimelineManager.$inject=["$http","$q"],angular.module("app.communitys").service("CommunityTimelineManager",communityTimelineManager);