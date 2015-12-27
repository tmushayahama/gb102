var hobbyNoteManager=function($http,$q){var HobbyNoteManager=function(){this.hobbyNotes=[]};return HobbyNoteManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},HobbyNoteManager.prototype.getHobbyNote=function(hobbyId,noteId){var self=this,deferred=$q.defer();return $http.get("/api/hobby/"+hobbyId+"/note/"+noteId).success(function(data){self.hobbyNote=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbyNoteManager.prototype.editHobbyNote=function(hobbyNoteData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/hobby/note/edit",data:hobbyNoteData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbyNoteManager};hobbyNoteManager.$inject=["$http","$q"],angular.module("app.hobbys").service("HobbyNoteManager",hobbyNoteManager);