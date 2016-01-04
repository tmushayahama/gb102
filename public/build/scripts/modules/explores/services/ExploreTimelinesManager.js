var exploreTimelinesManager=function($http,$q){var ExploreTimelinesManager=function(){this.exploreTimelines=[]};return ExploreTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExploreTimelinesManager.prototype.getExploreTimelines=function(exploreId){var self=this,deferred=$q.defer();return self.exploreTimelines=[],$http.get("/api/explore/"+exploreId+"/timelines").success(function(data){self.exploreTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTimelinesManager.prototype.getExploreTimeline=function(exploreId,timelineId){var self=this,deferred=$q.defer();return self.exploreTimelines=[],$http.get("/api/explore/"+exploreId+"/timeline/"+timelineId).success(function(data){self.exploreTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTimelinesManager.prototype.createExploreTimeline=function(exploreTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/timeline/create",data:exploreTimelineData}).success(function(data){self.exploreTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTimelinesManager.prototype.editExploreTimeline=function(exploreTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/timeline/edit",data:exploreTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreTimelinesManager};exploreTimelinesManager.$inject=["$http","$q"],angular.module("app.explores").service("ExploreTimelinesManager",exploreTimelinesManager);