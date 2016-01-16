var swipeTimelinesManager=function($http,$q){var SwipeTimelinesManager=function(){this.swipeTimelines=[]};return SwipeTimelinesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SwipeTimelinesManager.prototype.getSwipeTimelines=function(swipeId){var self=this,deferred=$q.defer();return self.swipeTimelines=[],$http.get("/api/swipe/"+swipeId+"/timelines").success(function(data){self.swipeTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeTimelinesManager.prototype.getSwipeTimeline=function(swipeId,timelineId){var self=this,deferred=$q.defer();return self.swipeTimelines=[],$http.get("/api/swipe/"+swipeId+"/timeline/"+timelineId).success(function(data){self.swipeTimelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeTimelinesManager.prototype.createSwipeTimeline=function(swipeTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/timeline/create",data:swipeTimelineData}).success(function(data){self.swipeTimelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeTimelinesManager.prototype.editSwipeTimeline=function(swipeTimelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/swipe/timeline/edit",data:swipeTimelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SwipeTimelinesManager};swipeTimelinesManager.$inject=["$http","$q"],angular.module("app.swipe").service("SwipeTimelinesManager",swipeTimelinesManager);