var componentsSrv=function($http,$q){var ComponentsSrv=function(){};return ComponentsSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ComponentsSrv.prototype.getComponents=function(listFormat){var self=this,deferred=$q.defer();return $http.get("/api/components/listformat/"+listFormat).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ComponentsSrv.prototype.getComponentsByType=function(type,listFormat){var self=this,deferred=$q.defer();return $http.get("/api/components/listformat/"+listFormat+"/type/"+type).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ComponentsSrv.prototype.getComponent=function(componentId,listFormat){var self=this,deferred=$q.defer();return $http.get("/api/components/"+componentId+"/listformat/"+listFormat).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ComponentsSrv.prototype.createComponent=function(componentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/explorer/"+componentData.explorerId+"/components/create",data:componentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ComponentsSrv.prototype.editComponentDescription=function(componentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/component/"+componentData.componentId+"/edit/description",data:componentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ComponentsSrv.prototype.editComponentBackground=function(componentData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/component/"+componentData.componentId+"/edit/background",data:componentData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ComponentsSrv};componentsSrv.$inject=["$http","$q"],angular.module("app.explorer").service("ComponentsSrv",componentsSrv);