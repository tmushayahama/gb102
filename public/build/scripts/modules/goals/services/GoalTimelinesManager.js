angular.module("app.goals").service("GoalTimelinesManager",["$http","$q",function(a,b){var c=function(){this.goalTimelines=[]};return c.prototype.deferredHandler=function(a,b,c){return a&&"object"==typeof a||(this.error="Error"),!this.error&&a.result&&a.result.error&&(this.error=a.result.error),!this.error&&a.error&&(this.error=a.error.message),!this.error&&c&&(this.error=c),this.error?b.reject(a):b.resolve(a)},c.prototype.getGoalTimelines=function(c){var d=this,e=b.defer();return d.goalTimelines=[],a.get("/api/goal/"+c+"/timelines").success(function(a){d.goalTimelines=a,d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c.prototype.getGoalTimeline=function(c,d){var e=this,f=b.defer();return e.goalTimelines=[],a.get("/api/goal/"+c+"/timeline/"+d).success(function(a){e.goalTimelines=a,e.deferredHandler(a,f)}).error(function(a){e.deferredHandler(a,f,"Unknown error")}),f.promise},c.prototype.createGoalTimeline=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/goal/timeline/create",data:c}).success(function(a){d.goalTimelines.unshift(a),d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c.prototype.editGoalTimeline=function(c){var d=this,e=b.defer();return a({method:"POST",url:"/api/goal/timeline/edit",data:c}).success(function(a){d.deferredHandler(a,e)}).error(function(a){d.deferredHandler(a,e,"Unknown error")}),e.promise},c}]);