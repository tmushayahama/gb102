var adviceSrv=function($http,$q){var AdviceSrv=function(){this.advice=[]};return AdviceSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},AdviceSrv.prototype.getAdvice=function(adviceId){var self=this,deferred=$q.defer();return $http.get("/api/advice/"+adviceId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceSrv.prototype.getSubAdvices=function(parentexplorerId){var self=this,deferred=$q.defer();return $http.get("/api/advices/subadvices/"+parentexplorerId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceSrv.prototype.editAdvice=function(adviceData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/edit",data:adviceData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceSrv};adviceSrv.$inject=["$http","$q"],angular.module("app.advice").service("AdviceSrv",adviceSrv);