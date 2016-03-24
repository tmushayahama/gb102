var collaborationsSrv=function($http,$q){var CollaborationsSrv=function(){this.collaborations=[]};return CollaborationsSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationsSrv.prototype.getAllCollaborations=function(){var self=this,deferred=$q.defer();return $http.get("/api/collaborations/all").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationsSrv.prototype.getAppCollaborations=function(appName){var self=this,deferred=$q.defer();return $http.get("/api/collaborations/all/"+appName).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationsSrv.prototype.getMyCollaborations=function(){var self=this,deferred=$q.defer();return $http.get("/api/collaborations/mine").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationsSrv.prototype.getCollaboration=function(collaborationId,Id){var self=this,deferred=$q.defer();return self.collaboration=[],$http.get("/api/collaboration/"+collaborationId+"//"+Id).success(function(data){self.collaboration=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationsSrv.prototype.createCollaboration=function(collaborationData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/create",data:collaborationData}).success(function(data){self.collaborations.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationsSrv.prototype.editCollaboration=function(collaborationData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaborationedit",data:collaborationData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationsSrv};collaborationsSrv.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationsSrv",collaborationsSrv);