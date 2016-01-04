var communityCommentsManager=function($http,$q){var CommunityCommentsManager=function(){this.communityComments=[]};return CommunityCommentsManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CommunityCommentsManager.prototype.getCommunityComments=function(communityId){var self=this,deferred=$q.defer();return self.communityComments=[],$http.get("/api/community/"+communityId+"/comments").success(function(data){self.communityComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityCommentsManager.prototype.getCommunityComment=function(communityId,commentId){var self=this,deferred=$q.defer();return self.communityComments=[],$http.get("/api/community/"+communityId+"/comment/"+commentId).success(function(data){self.communityComments=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityCommentsManager.prototype.createCommunityComment=function(communityCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/community/comment/create",data:communityCommentData}).success(function(data){self.communityComments.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityCommentsManager.prototype.editCommunityComment=function(communityCommentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/community/comment/edit",data:communityCommentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityCommentsManager};communityCommentsManager.$inject=["$http","$q"],angular.module("app.communitys").service("CommunityCommentsManager",communityCommentsManager);