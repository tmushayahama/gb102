var goalCommentsManager=function($http,$q){var GoalCommentsManager=function(){this.goalComments=[]};return GoalCommentsManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalCommentsManager.prototype.getGoalComments=function(goalId){var self=this,deferred=$q.defer();return self.goalComments=[],$http.get("/api/goal/"+goalId+"/comments").success(function(data){self.goalComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalCommentsManager.prototype.getGoalComment=function(goalId,commentId){var self=this,deferred=$q.defer();return self.goalComments=[],$http.get("/api/goal/"+goalId+"/comment/"+commentId).success(function(data){self.goalComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalCommentsManager.prototype.createGoalComment=function(goalCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/comment/create",data:goalCommentData}).success(function(data){self.goalComments.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalCommentsManager.prototype.editGoalComment=function(goalCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/comment/edit",data:goalCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalCommentsManager};goalCommentsManager.$inject=["$http","$q"],angular.module("app.goals").service("GoalCommentsManager",goalCommentsManager);