var adviceCommentSrv=function($http,$q){var AdviceCommentSrv=function(){this.adviceComments=[]};return AdviceCommentSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},AdviceCommentSrv.prototype.getAdviceComment=function(adviceId,commentId){var self=this,deferred=$q.defer();return $http.get("/api/advice/"+adviceId+"/comment/"+commentId).success(function(data){self.adviceComment=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceCommentSrv.prototype.editAdviceComment=function(adviceCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/comment/edit",data:adviceCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceCommentSrv};adviceCommentSrv.$inject=["$http","$q"],angular.module("app.advice").service("AdviceCommentSrv",adviceCommentSrv);