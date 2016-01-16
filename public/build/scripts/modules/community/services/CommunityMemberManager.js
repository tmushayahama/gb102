var communityManager=function($http,$q){var CommunityManager=function(){this.community=[]};return CommunityManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},CommunityManager.prototype.getCommunity=function(communityId){var self=this,deferred=$q.defer();return $http.get("/api/community/"+communityId).success(function(data){self.community=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityManager.prototype.editCommunity=function(communityData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/community/edit",data:communityData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},CommunityManager};communityManager.$inject=["$http","$q"],angular.module("app.communitys").service("CommunityManager",communityManager);