var explorersSrv=function($http,$q){var ExplorersSrv=function(){this.explorers=[]};return ExplorersSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExplorersSrv.prototype.getAllExplorers=function(){var self=this,deferred=$q.defer();return $http.get("/api/explorers/all").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv.prototype.getAppExplorers=function(appName){var self=this,deferred=$q.defer();return $http.get("/api/explorers/all/"+appName).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv.prototype.getMyExplorers=function(){var self=this,deferred=$q.defer();return $http.get("/api/explorers/mine").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv.prototype.getExplorer=function(explorerId,Id){var self=this,deferred=$q.defer();return self.explorer=[],$http.get("/api/explorer/"+explorerId+"//"+Id).success(function(data){self.explorer=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv.prototype.createExplorer=function(explorerData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/create",data:explorerData}).success(function(data){self.explorers.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv.prototype.editExplorer=function(explorerData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/exploreredit",data:explorerData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv.prototype.getExplorerRequestOptions=function(explorerId){var self=this,deferred=$q.defer();return $http.get("/api/explorer/"+explorerId+"/requestoptions").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExplorersSrv};explorersSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ExplorersSrv",explorersSrv);