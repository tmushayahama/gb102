var exploreNotesManager=function($http,$q){var ExploreNotesManager=function(){this.exploreNotes=[]};return ExploreNotesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExploreNotesManager.prototype.getExploreNotes=function(exploreId){var self=this,deferred=$q.defer();return self.exploreNotes=[],$http.get("/api/explore/"+exploreId+"/notes").success(function(data){self.exploreNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreNotesManager.prototype.getExploreNote=function(exploreId,noteId){var self=this,deferred=$q.defer();return self.exploreNotes=[],$http.get("/api/explore/"+exploreId+"/note/"+noteId).success(function(data){self.exploreNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreNotesManager.prototype.createExploreNote=function(exploreNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/note/create",data:exploreNoteData}).success(function(data){self.exploreNotes.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreNotesManager.prototype.editExploreNote=function(exploreNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/note/edit",data:exploreNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreNotesManager};exploreNotesManager.$inject=["$http","$q"],angular.module("app.explore").service("ExploreNotesManager",exploreNotesManager);