var collaborationProgressManager=function($http,$q){var CollaborationProgressManager=function(){this.collaborationProgress=[]};return CollaborationProgressManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CollaborationProgressManager.prototype.getCollaborationProgress=function(collaborationId){var self=this,deferred=$q.defer();return self.collaborationProgress=[],$http.get("/api/collaboration/"+collaborationId+"/progress").success(function(data){self.collaborationProgress=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationProgressManager.prototype.getCollaborationProgress=function(collaborationId,progressId){var self=this,deferred=$q.defer();return self.collaborationProgress=[],$http.get("/api/collaboration/"+collaborationId+"/progress/"+progressId).success(function(data){self.collaborationProgress=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationProgressManager.prototype.createCollaborationProgress=function(collaborationProgressData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/progress/create",data:collaborationProgressData}).success(function(data){self.collaborationProgress.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationProgressManager.prototype.editCollaborationProgress=function(collaborationProgressData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/collaboration/progress/edit",data:collaborationProgressData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CollaborationProgressManager};collaborationProgressManager.$inject=["$http","$q"],angular.module("app.collaboration").service("CollaborationProgressManager",collaborationProgressManager);