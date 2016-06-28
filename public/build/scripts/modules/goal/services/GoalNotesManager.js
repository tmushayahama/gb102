var goalNotesSrv=function($http,$q){var GoalNotesSrv=function(){this.goalNotes=[]};return GoalNotesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},GoalNotesSrv.prototype.getGoalNotes=function(goalId){var self=this,deferred=$q.defer();return self.goalNotes=[],$http.get("/api/goal/"+goalId+"/notes").success(function(data){self.goalNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalNotesSrv.prototype.getGoalNote=function(goalId,noteId){var self=this,deferred=$q.defer();return self.goalNotes=[],$http.get("/api/goal/"+goalId+"/note/"+noteId).success(function(data){self.goalNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalNotesSrv.prototype.createGoalNote=function(goalNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/note/create",data:goalNoteData}).success(function(data){self.goalNotes.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalNotesSrv.prototype.editGoalNote=function(goalNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/goal/note/edit",data:goalNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},GoalNotesSrv};goalNotesSrv.$inject=["$http","$q"],angular.module("app.goal").service("GoalNotesSrv",goalNotesSrv);