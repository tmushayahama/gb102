var goalWeblinkManager=function($http,$q){var GoalWeblinkManager=function(){this.goalWeblinks=[]};return GoalWeblinkManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalWeblinkManager.prototype.getGoalWeblink=function(goalId,weblinkId){var self=this,deferred=$q.defer();return $http.get("/api/goal/"+goalId+"/weblink/"+weblinkId).success(function(data){self.goalWeblink=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalWeblinkManager.prototype.editGoalWeblink=function(goalWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/weblink/edit",data:goalWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalWeblinkManager};goalWeblinkManager.$inject=["$http","$q"],angular.module("app.goals").service("GoalWeblinkManager",goalWeblinkManager);