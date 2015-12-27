var adviceTimelinesManager=function($http,$q){var AdviceTimelinesManager=function(){this.adviceTimelines=[]};return AdviceTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},AdviceTimelinesManager.prototype.getAdviceTimelines=function(adviceId){var self=this,deferred=$q.defer();return self.adviceTimelines=[],$http.get("/api/advice/"+adviceId+"/timelines").success(function(data){self.adviceTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTimelinesManager.prototype.getAdviceTimeline=function(adviceId,timelineId){var self=this,deferred=$q.defer();return self.adviceTimelines=[],$http.get("/api/advice/"+adviceId+"/timeline/"+timelineId).success(function(data){self.adviceTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTimelinesManager.prototype.createAdviceTimeline=function(adviceTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/timeline/create",data:adviceTimelineData}).success(function(data){self.adviceTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTimelinesManager.prototype.editAdviceTimeline=function(adviceTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/timeline/edit",data:adviceTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceTimelinesManager};adviceTimelinesManager.$inject=["$http","$q"],angular.module("app.advices").service("AdviceTimelinesManager",adviceTimelinesManager);