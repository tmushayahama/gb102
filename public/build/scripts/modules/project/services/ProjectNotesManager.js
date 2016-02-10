var projectNotesManager=function($http,$q){var ProjectNotesManager=function(){this.projectNotes=[]};return ProjectNotesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProjectNotesManager.prototype.getProjectNotes=function(projectId){var self=this,deferred=$q.defer();return self.projectNotes=[],$http.get("/api/project/"+projectId+"/notes").success(function(data){self.projectNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectNotesManager.prototype.getProjectNote=function(projectId,noteId){var self=this,deferred=$q.defer();return self.projectNotes=[],$http.get("/api/project/"+projectId+"/note/"+noteId).success(function(data){self.projectNotes=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectNotesManager.prototype.createProjectNote=function(projectNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/note/create",data:projectNoteData}).success(function(data){self.projectNotes.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectNotesManager.prototype.editProjectNote=function(projectNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/note/edit",data:projectNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectNotesManager};projectNotesManager.$inject=["$http","$q"],angular.module("app.project").service("ProjectNotesManager",projectNotesManager);