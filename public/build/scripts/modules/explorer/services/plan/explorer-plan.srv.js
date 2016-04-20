var explorerPlanSrv=function($http,$q){var ExplorerPlanSrv=function(){this.explorerPlans=[]};return ExplorerPlanSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorerPlanSrv.prototype.getExplorerPlan=function(explorerId,planId){var self=this,deferred=$q.defer();return $http.get("/api/explorer/"+explorerId+"/plan/"+planId).success(function(data){self.explorerPlan=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerPlanSrv.prototype.editExplorerPlan=function(explorerPlanData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/plan/edit",data:explorerPlanData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorerPlanSrv};explorerPlanSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorerPlanSrv",explorerPlanSrv);