var promisesManager=function($http,$q){var PromisesManager=function(){this.promises=[]};return PromisesManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},PromisesManager.prototype.getAllPromises=function(){var self=this,deferred=$q.defer();return self.promises=[],$http.get("/api/promises/all").success(function(data){self.promises=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},PromisesManager.prototype.getMyPromises=function(){var self=this,deferred=$q.defer();return self.promises=[],$http.get("/api/promises/mine").success(function(data){self.promises=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},PromisesManager.prototype.getPromise=function(promiseId,Id){var self=this,deferred=$q.defer();return self.promise=[],$http.get("/api/promise/"+promiseId+"//"+Id).success(function(data){self.promise=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},PromisesManager.prototype.createPromise=function(promiseData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/promise/create",data:promiseData}).success(function(data){self.promises.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},PromisesManager.prototype.editPromise=function(promiseData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/promiseedit",data:promiseData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},PromisesManager};promisesManager.$inject=["$http","$q"],angular.module("app.promises").service("PromisesManager",promisesManager);