var explorerContributionsSrv=function($http,$q){var ExplorerContributionsSrv=function(){this.explorerContributions=[]};return ExplorerContributionsSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorerContributionsSrv.prototype.getExplorerContributions=function(explorerId){var self=this,deferred=$q.defer();return self.explorerContributions=[],$http.get("/api/explorer/"+explorerId+"/contributions").success(function(data){self.explorerContributions=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerContributionsSrv.prototype.getExplorerContribution=function(explorerId,contributionId){var self=this,deferred=$q.defer();return self.explorerContributions=[],$http.get("/api/explorer/"+explorerId+"/contribution/"+contributionId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerContributionsSrv.prototype.getExplorerContributionLevel=function(explorerId,contributionId){var self=this,deferred=$q.defer();return self.explorerContributions=[],$http.get("/api/explorer/"+explorerId+"/contribution/"+contributionId+"/level").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerContributionsSrv.prototype.createExplorerContribution=function(explorerContributionData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/contribution/create",data:explorerContributionData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerContributionsSrv.prototype.editExplorerContribution=function(explorerContributionData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/contribution/edit",data:explorerContributionData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerContributionsSrv};explorerContributionsSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorerContributionsSrv",explorerContributionsSrv);