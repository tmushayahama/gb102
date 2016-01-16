var exploresManager=function($http,$q){var ExploresManager=function(){this.explores=[]};return ExploresManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ExploresManager.prototype.getAllExplores=function(){var self=this,deferred=$q.defer();return self.explores=[],$http.get("/api/explores/all").success(function(data){self.explores=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploresManager.prototype.getMyExplores=function(){var self=this,deferred=$q.defer();return self.explores=[],$http.get("/api/explores/mine").success(function(data){self.explores=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploresManager.prototype.getExplore=function(exploreId,Id){var self=this,deferred=$q.defer();return self.explore=[],$http.get("/api/explore/"+exploreId+"//"+Id).success(function(data){self.explore=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploresManager.prototype.createExplore=function(exploreData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explore/create",data:exploreData}).success(function(data){self.explores.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploresManager.prototype.editExplore=function(exploreData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/exploreedit",data:exploreData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ExploresManager};exploresManager.$inject=["$http","$q"],angular.module("app.explore").service("ExploresManager",exploresManager);