var teachCommentManager=function($http,$q){var TeachCommentManager=function(){this.teachComments=[]};return TeachCommentManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},TeachCommentManager.prototype.getTeachComment=function(teachId,commentId){var self=this,deferred=$q.defer();return $http.get("/api/teach/"+teachId+"/comment/"+commentId).success(function(data){self.teachComment=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachCommentManager.prototype.editTeachComment=function(teachCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/teach/comment/edit",data:teachCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachCommentManager};teachCommentManager.$inject=["$http","$q"],angular.module("app.teach").service("TeachCommentManager",teachCommentManager);