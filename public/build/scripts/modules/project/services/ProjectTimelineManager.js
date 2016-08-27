var projectProgressSrv=function($http,$q){var ProjectProgressSrv=function(){this.projectProgress=[]};return ProjectProgressSrv.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProjectProgressSrv.prototype.getProjectProgress=function(projectId,progressId){var self=this,deferred=$q.defer();return $http.get("/api/project/"+projectId+"/progress/"+progressId).success(function(data){self.projectProgress=data,self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectProgressSrv.prototype.editProjectProgress=function(projectProgressData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/progress/edit",data:projectProgressData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectProgressSrv};projectProgressSrv.$inject=["$http","$q"],angular.module("app.project").service("ProjectProgressSrv",projectProgressSrv);