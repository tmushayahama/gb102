var teachsSrv=function($http,$q){var TeachsSrv=function(){this.teachs=[]};return TeachsSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},TeachsSrv.prototype.getAllTeachs=function(){var self=this,deferred=$q.defer();return $http.get("/api/teachs/all").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachsSrv.prototype.getAppTeachs=function(appName){var self=this,deferred=$q.defer();return $http.get("/api/teachs/all/"+appName).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachsSrv.prototype.getMyTeachs=function(){var self=this,deferred=$q.defer();return $http.get("/api/teachs/mine").success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachsSrv.prototype.getTeach=function(teachId,Id){var self=this,deferred=$q.defer();return self.teach=[],$http.get("/api/teach/"+teachId+"//"+Id).success(function(data){self.teach=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachsSrv.prototype.createTeach=function(teachData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/teach/create",data:teachData}).success(function(data){self.teachs.unshift(data),self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachsSrv.prototype.editTeach=function(teachData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/teachedit",data:teachData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},TeachsSrv};teachsSrv.$inject=["$http","$q"],angular.module("app.teach").service("TeachsSrv",teachsSrv);