var projectManager=function($http,$q){var ProjectManager=function(){this.project=[]};return ProjectManager.prototype.deferredHandler=function(data,deferred,defaultMsg){return data&&"object"==typeof data||(this.error="Error"),!this.error&&data.result&&data.result.error&&(this.error=data.result.error),!this.error&&data.error&&(this.error=data.error.message),!this.error&&defaultMsg&&(this.error=defaultMsg),this.error?deferred.reject(data):deferred.resolve(data)},ProjectManager.prototype.getProject=function(projectId){var self=this,deferred=$q.defer();return $http.get("/api/project/"+projectId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectManager.prototype.getSubProjects=function(parentexplorerId){var self=this,deferred=$q.defer();return $http.get("/api/projects/subprojects/"+parentexplorerId).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectManager.prototype.editProject=function(projectData){var self=this,deferred=$q.defer();return $http({method:"POST",url:"/api/project/edit",data:projectData}).success(function(data){self.deferredHandler(data,deferred)}).error(function(data){self.deferredHandler(data,deferred,"Unknown error")}),deferred.promise},ProjectManager};projectManager.$inject=["$http","$q"],angular.module("app.project").service("ProjectManager",projectManager);