var explorerGuidelinesSrv=function($http,$q){var ExplorerGuidelinesSrv=function(){this.explorerGuidelines=[]};return ExplorerGuidelinesSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorerGuidelinesSrv.prototype.getExplorerGuidelines=function(explorerId){var self=this,deferred=$q.defer();return self.explorerGuidelines=[],$http.get("/api/explorer/"+explorerId+"/guidelines").success(function(data){self.explorerGuidelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerGuidelinesSrv.prototype.getExplorerGuideline=function(explorerId,guidelineId){var self=this,deferred=$q.defer();return self.explorerGuidelines=[],$http.get("/api/explorer/"+explorerId+"/guideline/"+guidelineId).success(function(data){self.explorerGuidelines=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerGuidelinesSrv.prototype.createExplorerGuideline=function(explorerGuidelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/guideline/create",data:explorerGuidelineData}).success(function(data){self.explorerGuidelines.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerGuidelinesSrv.prototype.editExplorerGuideline=function(explorerGuidelineData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/guideline/edit",data:explorerGuidelineData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerGuidelinesSrv};explorerGuidelinesSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorerGuidelinesSrv",explorerGuidelinesSrv);