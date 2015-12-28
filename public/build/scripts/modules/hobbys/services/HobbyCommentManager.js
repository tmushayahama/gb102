var hobbyCommentManager=function($http,$q){var HobbyCommentManager=function(){this.hobbyComments=[]};return HobbyCommentManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},HobbyCommentManager.prototype.getHobbyComment=function(hobbyId,commentId){var self=this,deferred=$q.defer();return $http.get("/api/hobby/"+hobbyId+"/comment/"+commentId).success(function(data){self.hobbyComment=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbyCommentManager.prototype.editHobbyComment=function(hobbyCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/hobby/comment/edit",data:hobbyCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},HobbyCommentManager};hobbyCommentManager.$inject=["$http","$q"],angular.module("app.hobbys").service("HobbyCommentManager",hobbyCommentManager);