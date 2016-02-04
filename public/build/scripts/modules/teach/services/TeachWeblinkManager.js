var teachWeblinkManager=function($http,$q){var TeachWeblinkManager=function(){this.teachWeblinks=[]};return TeachWeblinkManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},TeachWeblinkManager.prototype.getTeachWeblink=function(teachId,weblinkId){var self=this,deferred=$q.defer();return $http.get("/api/teach/"+teachId+"/weblink/"+weblinkId).success(function(data){self.teachWeblink=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachWeblinkManager.prototype.editTeachWeblink=function(teachWeblinkData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/teach/weblink/edit",data:teachWeblinkData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachWeblinkManager};teachWeblinkManager.$inject=["$http","$q"],angular.module("app.teach").service("TeachWeblinkManager",teachWeblinkManager);