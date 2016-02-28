var collaborationManager=function($http,$q){var CollaborationManager=function(){this.collaboration=[]};return CollaborationManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationManager.prototype.getCollaboration=function(collaborationId){var self=this,deferred=$q.defer();return $http.get("/api/collaboration/"+collaborationId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationManager.prototype.getSubCollaborations=function(parentexplorerId){var self=this,deferred=$q.defer();return $http.get("/api/collaborations/subcollaborations/"+parentexplorerId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationManager.prototype.editCollaboration=function(collaborationData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/edit",data:collaborationData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationManager};collaborationManager.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationManager",collaborationManager);