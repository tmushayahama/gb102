var collaborationProgressSrv=function($http,$q){var CollaborationProgressSrv=function(){this.collaborationProgress=[]};return CollaborationProgressSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationProgressSrv.prototype.getCollaborationProgress=function(collaborationId,progressId){var self=this,deferred=$q.defer();return $http.get("/api/collaboration/"+collaborationId+"/progress/"+progressId).success(function(data){self.collaborationProgress=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationProgressSrv.prototype.editCollaborationProgress=function(collaborationProgressData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/progress/edit",data:collaborationProgressData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationProgressSrv};collaborationProgressSrv.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationProgressSrv",collaborationProgressSrv);