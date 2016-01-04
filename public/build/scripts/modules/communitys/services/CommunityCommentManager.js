var communityCommentManager=function($http,$q){var CommunityCommentManager=function(){this.communityComments=[]};return CommunityCommentManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CommunityCommentManager.prototype.getCommunityComment=function(communityId,commentId){var self=this,deferred=$q.defer();return $http.get("/api/community/"+communityId+"/comment/"+commentId).success(function(data){self.communityComment=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityCommentManager.prototype.editCommunityComment=function(communityCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/community/comment/edit",data:communityCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityCommentManager};communityCommentManager.$inject=["$http","$q"],angular.module("app.communitys").service("CommunityCommentManager",communityCommentManager);