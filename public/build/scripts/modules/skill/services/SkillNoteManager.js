var skillNotesSrv=function($http,$q){var SkillNotesSrv=function(){this.skillNotes=[]};return SkillNotesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},SkillNotesSrv.prototype.getSkillNote=function(skillId,noteId){var self=this,deferred=$q.defer();return $http.get("/api/skill/"+skillId+"/note/"+noteId).success(function(data){self.skillNote=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillNotesSrv.prototype.editSkillNote=function(skillNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/skill/note/edit",data:skillNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},SkillNotesSrv};skillNotesSrv.$inject=["$http","$q"],angular.module("app.skills").service("SkillNotesSrv",skillNotesSrv);