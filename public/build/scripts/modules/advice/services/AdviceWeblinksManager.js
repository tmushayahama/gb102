var adviceWeblinksManager=function($http,$q){var AdviceWeblinksManager=function(){this.adviceWeblinks=[]};return AdviceWeblinksManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},AdviceWeblinksManager.prototype.getAdviceWeblinks=function(adviceId){var self=this,deferred=$q.defer();return self.adviceWeblinks=[],$http.get("/api/advice/"+adviceId+"/weblinks").success(function(data){self.adviceWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceWeblinksManager.prototype.getAdviceWeblink=function(adviceId,weblinkId){var self=this,deferred=$q.defer();return self.adviceWeblinks=[],$http.get("/api/advice/"+adviceId+"/weblink/"+weblinkId).success(function(data){self.adviceWeblinks=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceWeblinksManager.prototype.createAdviceWeblink=function(adviceWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/weblink/create",data:adviceWeblinkData}).success(function(data){self.adviceWeblinks.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceWeblinksManager.prototype.editAdviceWeblink=function(adviceWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/advice/weblink/edit",data:adviceWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},AdviceWeblinksManager};adviceWeblinksManager.$inject=["$http","$q"],angular.module("app.advice").service("AdviceWeblinksManager",adviceWeblinksManager);