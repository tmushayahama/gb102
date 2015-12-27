var goalTimelinesManager=function($http,$q){var GoalTimelinesManager=function(){this.goalTimelines=[]};return GoalTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalTimelinesManager.prototype.getGoalTimelines=function(goalId){var self=this,deferred=$q.defer();return self.goalTimelines=[],$http.get("/api/goal/"+goalId+"/timelines").success(function(data){self.goalTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTimelinesManager.prototype.getGoalTimeline=function(goalId,timelineId){var self=this,deferred=$q.defer();return self.goalTimelines=[],$http.get("/api/goal/"+goalId+"/timeline/"+timelineId).success(function(data){self.goalTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTimelinesManager.prototype.createGoalTimeline=function(goalTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/timeline/create",data:goalTimelineData}).success(function(data){self.goalTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTimelinesManager.prototype.editGoalTimeline=function(goalTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/timeline/edit",data:goalTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalTimelinesManager};goalTimelinesManager.$inject=["$http","$q"],angular.module("app.goals").service("GoalTimelinesManager",goalTimelinesManager);