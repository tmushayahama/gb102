var goalWeblinksSrv=function($http,$q){var GoalWeblinksSrv=function(){this.goalWeblinks=[]};return GoalWeblinksSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalWeblinksSrv.prototype.getGoalWeblinks=function(goalId){var self=this,deferred=$q.defer();return self.goalWeblinks=[],$http.get("/api/goal/"+goalId+"/weblinks").success(function(data){self.goalWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalWeblinksSrv.prototype.getGoalWeblink=function(goalId,weblinkId){var self=this,deferred=$q.defer();return self.goalWeblinks=[],$http.get("/api/goal/"+goalId+"/weblink/"+weblinkId).success(function(data){self.goalWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalWeblinksSrv.prototype.createGoalWeblink=function(goalWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/weblink/create",data:goalWeblinkData}).success(function(data){self.goalWeblinks.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalWeblinksSrv.prototype.editGoalWeblink=function(goalWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/weblink/edit",data:goalWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalWeblinksSrv};goalWeblinksSrv.$inject=["$http","$q"],angular.module("app.goal").service("GoalWeblinksSrv",goalWeblinksSrv);