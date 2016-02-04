var advicesManager=function($http,$q){var AdvicesManager=function(){this.advices=[]};return AdvicesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},AdvicesManager.prototype.getAllAdvices=function(){var self=this,deferred=$q.defer();return $http.get("/api/advices/all").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdvicesManager.prototype.getAppAdvices=function(appName){var self=this,deferred=$q.defer();return $http.get("/api/advices/all/"+appName).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdvicesManager.prototype.getMyAdvices=function(){var self=this,deferred=$q.defer();return $http.get("/api/advices/mine").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdvicesManager.prototype.getAdvice=function(adviceId,Id){var self=this,deferred=$q.defer();return self.advice=[],$http.get("/api/advice/"+adviceId+"//"+Id).success(function(data){self.advice=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdvicesManager.prototype.createAdvice=function(adviceData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/create",data:adviceData}).success(function(data){self.advices.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdvicesManager.prototype.editAdvice=function(adviceData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/adviceedit",data:adviceData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdvicesManager};advicesManager.$inject=["$http","$q"],angular.module("app.advice").service("AdvicesManager",advicesManager);