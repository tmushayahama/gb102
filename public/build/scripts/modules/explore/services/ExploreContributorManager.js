var exploreContributorManager=function($http,$q){var ExploreContributorManager=function(){this.exploreContributors=[]};return ExploreContributorManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExploreContributorManager.prototype.getExploreContributor=function(exploreId,contributorId){var self=this,deferred=$q.defer();return $http.get("/api/explore/"+exploreId+"/contributor/"+contributorId).success(function(data){self.exploreContributor=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreContributorManager.prototype.editExploreContributor=function(exploreContributorData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/contributor/edit",data:exploreContributorData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploreContributorManager};exploreContributorManager.$inject=["$http","$q"],angular.module("app.explore").service("ExploreContributorManager",exploreContributorManager);