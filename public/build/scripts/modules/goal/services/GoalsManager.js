var goalsManager=function($http,$q){var GoalsManager=function(){this.goals=[]};return GoalsManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalsManager.prototype.getAllGoals=function(){var self=this,deferred=$q.defer();return $http.get("/api/goals/all").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalsManager.prototype.getAppGoals=function(appName){var self=this,deferred=$q.defer();return $http.get("/api/goals/all/"+appName).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalsManager.prototype.getMyGoals=function(){var self=this,deferred=$q.defer();return $http.get("/api/goals/mine").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalsManager.prototype.getGoal=function(goalId,Id){var self=this,deferred=$q.defer();return self.goal=[],$http.get("/api/goal/"+goalId+"//"+Id).success(function(data){self.goal=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalsManager.prototype.createGoal=function(goalData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/create",data:goalData}).success(function(data){self.goals.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalsManager.prototype.editGoal=function(goalData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goaledit",data:goalData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalsManager};goalsManager.$inject=["$http","$q"],angular.module("app.goal").service("GoalsManager",goalsManager);