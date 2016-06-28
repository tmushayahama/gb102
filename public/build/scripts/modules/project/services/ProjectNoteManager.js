var projectNotesSrv=function($http,$q){var ProjectNotesSrv=function(){this.projectNotes=[]};return ProjectNotesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProjectNotesSrv.prototype.getProjectNote=function(projectId,noteId){var self=this,deferred=$q.defer();return $http.get("/api/project/"+projectId+"/note/"+noteId).success(function(data){self.projectNote=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectNotesSrv.prototype.editProjectNote=function(projectNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/note/edit",data:projectNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectNotesSrv};projectNotesSrv.$inject=["$http","$q"],angular.module("app.project").service("ProjectNotesSrv",projectNotesSrv);