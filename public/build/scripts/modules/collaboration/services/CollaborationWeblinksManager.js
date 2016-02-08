var collaborationWeblinksManager=function($http,$q){var CollaborationWeblinksManager=function(){this.collaborationWeblinks=[]};return CollaborationWeblinksManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationWeblinksManager.prototype.getCollaborationWeblinks=function(collaborationId){var self=this,deferred=$q.defer();return self.collaborationWeblinks=[],$http.get("/api/collaboration/"+collaborationId+"/weblinks").success(function(data){self.collaborationWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationWeblinksManager.prototype.getCollaborationWeblink=function(collaborationId,weblinkId){var self=this,deferred=$q.defer();return self.collaborationWeblinks=[],$http.get("/api/collaboration/"+collaborationId+"/weblink/"+weblinkId).success(function(data){self.collaborationWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationWeblinksManager.prototype.createCollaborationWeblink=function(collaborationWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/weblink/create",data:collaborationWeblinkData}).success(function(data){self.collaborationWeblinks.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationWeblinksManager.prototype.editCollaborationWeblink=function(collaborationWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/weblink/edit",data:collaborationWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationWeblinksManager};collaborationWeblinksManager.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationWeblinksManager",collaborationWeblinksManager);