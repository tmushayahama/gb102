var teachNotesSrv=function($http,$q){var TeachNotesSrv=function(){this.teachNotes=[]};return TeachNotesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},TeachNotesSrv.prototype.getTeachNote=function(teachId,noteId){var self=this,deferred=$q.defer();return $http.get("/api/teach/"+teachId+"/note/"+noteId).success(function(data){self.teachNote=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachNotesSrv.prototype.editTeachNote=function(teachNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/teach/note/edit",data:teachNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachNotesSrv};teachNotesSrv.$inject=["$http","$q"],angular.module("app.teach").service("TeachNotesSrv",teachNotesSrv);